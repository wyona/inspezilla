/*************************************************
* Inspezilla
* @author Michael Wechner
*************************************************/

const X_VER       = "0.0.1";
const X_MSG       = "Install Inspezilla";
const X_NAME      = "Inspezilla";

const X_JAR_FILE  = "inspezilla.jar";
const X_CHROME    = "chrome";

const X_CONTENT   = "content/";
const X_SKIN      = "skin/";
const X_LOCALE    = "locale/";

// FIXME: Uninstalling ... (also see README.txt)
//logComment("Uninstalling previous version started ...");

var err = initInstall(X_MSG, X_NAME, X_VER);
logComment("initInstall(): " + err);
logComment("Installation started ...");
addFile("We're on our way ...", X_JAR_FILE, getFolder(X_CHROME), "");
registerChrome(CONTENT|DELAYED_CHROME, getFolder(X_CHROME, X_JAR_FILE), X_CONTENT);
registerChrome(SKIN|DELAYED_CHROME, getFolder(X_CHROME, X_JAR_FILE), X_SKIN);
registerChrome(LOCALE|DELAYED_CHROME, getFolder(X_CHROME, X_JAR_FILE), X_LOCALE);

err =  getLastError();
if (err == SUCCESS) {
    performInstall();
    alert(X_NAME + " has been installed successfully. Please restart Mozilla");
} else {
    cancelInstall();
}
