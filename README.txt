I N S P E Z I L L A
===================


Create XPI
----------

ant -f build.xml

where Apache Ant is required as build tool (http://ant.apache.org)


Installing
----------

file:///home/USERNAME/src/inspezilla/index.html


(or to be served by Apache, httpd.conf: Addtype application/x-xpinstall .xpi)


Debugging Installation
----------------------

tail -f /home/USERNAME/.mozilla/default/yh59163j.slt/install.log

or

tail -f /home/USERNAME/build/mozilla-1.6/install.log

NOTE: You might need to be "root" in order to install Inspezilla


Uninstalling
------------

rm /home/USERNAME/build/mozilla-1.6/chrome/inspezilla.jar
vi /home/USERNAME/build/mozilla-1.6/chrome/installed-chrome.txt
(remove the inspezilla entries)


Developing
----------

cd src
cp build.properties.sample build.properties
Edit build.properties (Specify where Mozilla is located)
cd ..
ant -f build.xml install-jar
Restart Mozilla


Introspection
-------------

http://bitworking.org/rfc/draft-gregorio-07.html#rfc.section.5.1

Please note that Atom seems to have deprecated introspection:

http://bitworking.org/news/Deconstructing_the_AtomAPI
http://bitworking.org/projects/atom/draft-gregorio-09.html

Example
-------

<?xml version="1.0"?>

<introspection>
  <search-entries>http://www.foo.bar/search?atom-all</search-entries>
</introspection>
