/*
 * Copyright 2004 Michael Wechner
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */



/**
 * @author Michael Wechner
 * @version $Id: introspection.js,v 1.9 2004/03/07 23:31:56 michi Exp $
 */


/**
 * Debug
 */
function logDebug(methodName, message) {
    //alert('DEBUG: .' + methodName  + '(): ' + message);
}

/**
 * Info
 */
function logInfo(methodName, message) {
    alert('INFO: .' + methodName  + '(): ' + message);
}

/**
 * Error
 */
function logError(methodName, message) {
    alert('ERROR: .' + methodName  + '(): ' + message);
}


/*
 * Resolve URL
 * TODO: Does not cover all cases yet
 */
function resolveURL(referenceURL, relativeURL) {
    var resolvedURL = relativeURL;

    if (relativeURL.indexOf("http") == 0 || relativeURL.indexOf("https") == 0) {
        logDebug('resolveURL', 'Original URL: ' + resolvedURL);
        return resolvedURL;
    }

    if (referenceURL.lastIndexOf("/") >= 0) {
        var baseURL = referenceURL.substring(0, referenceURL.lastIndexOf("/") + 1);
        logDebug('resolveURL', 'Base URL = ' + baseURL);

        resolvedURL = baseURL + relativeURL;
        logDebug('resolveURL', 'Concatenated URL: ' + resolvedURL);
    }

    logDebug('resolveURL', 'Resolved URL = ' + resolvedURL);

    return resolvedURL;
}


/*
 * Get introspection URL /html/head/link[@type="application/x.atom+xml"]/@href
 * TODO: Inspezilla should also work with HTML and not only XHTML
 */
function getIntrospectionURL(pageURL) {
  logDebug('getIntrospectionURL', 'Page URL = ' + pageURL);

  // Load document (XHTML)
  var pageDocument = Sarissa.getDomDocument();
  pageDocument.async = false;
  pageDocument.load(pageURL);

  //logError('getIntrospectionURL', 'LEVI!');
  //var pageDocument = document.open();
  //var pageDocument = Document.open(pageURL);
  //logError('getIntrospectionURL', 'VANYA!');

  // Check if any link nodes exist
  var linkNodes = pageDocument.getElementsByTagName('link');
  if (linkNodes.length == 0) {
    logError('getIntrospectionURL', 'No link tag!');
    return null;
  }


  logDebug('getIntrospectionURL', 'Number of link tags = ' + pageDocument.getElementsByTagName('link').length);
  var href = null;
  for (j = 0; j < linkNodes.length; j++) {
    var linkNode = linkNodes[j];
    var type = linkNode.getAttribute("type");
    logDebug('getIntrospectionURL', 'Link node: ' + j + ' , type = ' + type);
    if (type.indexOf("application/x.atom+xml") == 0) {
      href = linkNode.getAttribute("href");
      logInfo('getIntrospectionURL', 'Introspection found, href = ' + href);
      break;
    }
  }

  if (href == null) {
    logError('getIntrospectionURL', 'No link tag with type application/x.atom+xml!');
    return null;
  }

  var introspectionURL = href;
  logDebug('getIntrospectionURL', 'href = ' + introspectionURL);
  var resolvedIntrospectionURL = resolveURL(pageURL, introspectionURL);
  logDebug('getIntrospectionURL', 'Resolved = ' + resolvedIntrospectionURL);

  return resolvedIntrospectionURL;
}


/*
 *
 */
function loadIntrospection(introspectionURL) {
  logDebug('loadIntrospection', 'Load introspection: ' + introspectionURL);


  // Load document (XML)
  var introspectionDocument = Sarissa.getDomDocument();
  introspectionDocument.async = false;
  introspectionDocument.load(introspectionURL);


  // now load all the vars
  this.vars = {};
  var rootnode = introspectionDocument.getElementsByTagName('introspection')[0];
  logDebug('loadIntrospection', 'Root node = ' + rootnode.nodeName);
  for (var i=0; i < rootnode.childNodes.length; i++) {
    var node = rootnode.childNodes[i];
    if (node.nodeType == 1) {
      logDebug('loadIntrospection', 'node = ' + node.nodeName);
      this.vars[node.nodeName] = node.childNodes[0].nodeValue;
    };
  };

  this.getVariable = function(name) {
    logDebug('loadIntrospection', 'Loading introspection completed');
    return this.vars[name];
  };
}
