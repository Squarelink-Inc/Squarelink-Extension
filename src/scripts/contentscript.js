import extension from 'extensionizer'
import config from '@/config'
const squarelinkMinScript = extension.extension.getURL('scripts/squarelink.min.js')

if (shouldInjectWeb3()) {
  chrome.storage.sync.get(['network'], function(items) {
    var network = items.network
    if (!network)
      network = { name: 'mainnet' }
    injectScript(network)
  })
}

chrome.storage.onChanged.addListener(function (changes, areaName) {
  injectScript(changes.network.newValue)
})

function injectScript (network) {
  var { url, chainId, name } = network
  var networkOpts
  if (name) networkOpts = name
  else networkOpts = { url, chainId }
  const inlineScript = `
  try {
    var sqlk = new Squarelink("${config.SQLK_ID}", ${JSON.stringify(networkOpts)});
    window.ethereum = sqlk.getProvider();
    window.ethereum.isMetaMask = function() { return true };
  } catch (e) {
    console.error('Squarelink script injection failed', e);
  }`
  const container = document.head || document.documentElement
  const squarelink = document.createElement('script')
  squarelink.setAttribute('async', '')
  squarelink.setAttribute('src', squarelinkMinScript)
  container.insertBefore(squarelink, container.children[0])
  squarelink.onload = function() {
    const inlineScriptTag = document.createElement('script')
    inlineScriptTag.setAttribute('async', '')
    inlineScriptTag.textContent = inlineScript
    container.insertBefore(inlineScriptTag, container.children[1])
    container.removeChild(inlineScriptTag)
    container.removeChild(squarelink)
  }
}


function shouldInjectWeb3() {
  return doctypeCheck() && suffixCheck() &&
    documentElementCheck() && !blacklistedDomainCheck()
}

function doctypeCheck () {
  const doctype = window.document.doctype
  if (doctype) {
    return doctype.name === 'html'
  } else {
    return true
  }
}

function suffixCheck () {
  const prohibitedTypes = [
    /\.xml$/,
    /\.pdf$/,
  ]
  const currentUrl = window.location.pathname
  for (let i = 0; i < prohibitedTypes.length; i++) {
    if (prohibitedTypes[i].test(currentUrl)) {
      return false
    }
  }
  return true
}

function documentElementCheck () {
  const documentElement = document.documentElement.nodeName
  if (documentElement) {
    return documentElement.toLowerCase() === 'html'
  }
  return true
}

function blacklistedDomainCheck () {
  const blacklistedDomains = [
    'uscourts.gov',
    'dropbox.com',
    'webbyawards.com',
    'cdn.shopify.com/s/javascripts/tricorder/xtld-read-only-frame.html',
    'adyen.com',
    'gravityforms.com',
    'harbourair.com',
    'ani.gamer.com.tw',
    'blueskybooking.com',
    'sharefile.com',
  ]
  const currentUrl = window.location.href
  let currentRegex
  for (let i = 0; i < blacklistedDomains.length; i++) {
    const blacklistedDomain = blacklistedDomains[i].replace('.', '\\.')
    currentRegex = new RegExp(`(?:https?:\\/\\/)(?:(?!${blacklistedDomain}).)*$`)
    if (!currentRegex.test(currentUrl)) {
      return true
    }
  }
  return false
}
