QUnit.module('josie-core core.js')
QUnit.test("josie-core version", function(assert) {
	assert.ok(Josie.version['josie-core'], JSON.stringify(Josie.version['josie-core']));
});

QUnit.test("josie-core utils", function(assert) {
	// deg2rad and rad2deg
	assert.equal(Josie.utils.deg2rad(50), 0.8726646259971648, 'deg2rad( 50 ) == 0.8726646259971648');
	assert.equal(Josie.utils.rad2deg(0.8726646259971648), 50, 'rad2deg( 0.8726646259971648 ) == 50');
	// round
	assert.equal(Josie.utils.round(13.37), 13, 'round( 13.37 ) == 13');
	assert.equal(Josie.utils.round(41.58), 42, 'round( 41.58 ) == 42');
	// ceil
	assert.equal(Josie.utils.ceil(13.37), 14, 'ceil( 13.37 ) == 14');
	assert.equal(Josie.utils.ceil(41.58), 42, 'ceil( 41.58 ) == 42');
	// floor
	assert.equal(Josie.utils.floor(41.58), 41, 'floor( 41.58 ) == 41');
	assert.equal(Josie.utils.floor(13.37), 13, 'floor( 13.37 ) == 13');
	// guid generation
	assert.ok(Josie.utils.S4(), 'S4()');
	assert.ok(Josie.utils.uniqueId(), 'uniqueId()');
	assert.notEqual(Josie.utils.uniqueId(), Josie.utils.uniqueId(), 'uniqueId() =! uniqueId()');
	// isjQuery
	assert.ok(Josie.utils.isjQuery(jQuery()), 'isjQuery( jQuery() )');
	assert.ok( ! Josie.utils.isjQuery({}), '! isjQuery( {} )');
	assert.ok( ! Josie.utils.isjQuery([]), '! isjQuery( [] )');
	// isUrl
	assert.ok(Josie.utils.isUrl('http://google.de'), 'isUrl( "http://google.de" )');
	assert.ok(Josie.utils.isUrl('https://google.de'), 'isUrl( "https://google.de" )');
	assert.ok(Josie.utils.isUrl('http://www.google.de'), 'isUrl( "http://www.google.de" )');
	assert.ok(Josie.utils.isUrl('https://www.google.de'), 'isUrl( "https://google.de" )');
	assert.ok(Josie.utils.isUrl('//google.de'), 'isUrl( "//google.de" )');
	assert.ok(Josie.utils.isUrl('//www.google.de'), 'isUrl( "//www.google.de" )');
	assert.ok(Josie.utils.isUrl('http://google.de:80'), 'isUrl( "http://google.de:80" )');
	assert.ok(Josie.utils.isUrl('https://google.de:443'), 'isUrl( "https://google.de:443" )');
	assert.ok(Josie.utils.isUrl('http://www.google.de:80'), 'isUrl( "http://www.google.de:80" )');
	assert.ok(Josie.utils.isUrl('https://www.google.de:443'), 'isUrl( "https://www.google.de:443" )');
	assert.ok(Josie.utils.isUrl('//google.de:80'), 'isUrl( "//google.de:80" )');
	assert.ok(Josie.utils.isUrl('//www.google.de:80'), 'isUrl( "//www.google.de:80" )');
	assert.ok(Josie.utils.isUrl('http://google.de?foo=bar&leet=1337#whoot'), 'isUrl( "http://google.de?foo=bar&leet=1337#whoot" )');
	assert.ok(Josie.utils.isUrl('https://google.de?foo=bar&leet=1337#whoot'), 'isUrl( "https://google.de?foo=bar&leet=1337#whoot" )');
	assert.ok(Josie.utils.isUrl('http://www.google.de?foo=bar&leet=1337#whoot'), 'isUrl( "http://www.google.de?foo=bar&leet=1337#whoot" )');
	assert.ok(Josie.utils.isUrl('https://www.google.de?foo=bar&leet=1337#whoot'), 'isUrl( "https://www.google.de?foo=bar&leet=1337#whoot" )');
	assert.ok(Josie.utils.isUrl('//google.de?foo=bar&leet=1337#whoot'), 'isUrl( "//google.de?foo=bar&leet=1337#whoot" )');
	assert.ok(Josie.utils.isUrl('//www.google.de?foo=bar&leet=1337#whoot'), 'isUrl( "//www.google.de?foo=bar&leet=1337#whoot" )');
	assert.ok(Josie.utils.isUrl('http://google.de/data/test?foo=bar&leet=1337#whoot'), 'isUrl( "http://google.de/data/test?foo=bar&leet=1337#whoot" )');
	assert.ok(Josie.utils.isUrl('https://google.de/data/test?foo=bar&leet=1337#whoot'), 'isUrl( "https://google.de/data/test?foo=bar&leet=1337#whoot" )');
	assert.ok(Josie.utils.isUrl('http://www.google.de/data/test?foo=bar&leet=1337#whoot'), 'isUrl( "http://www.google.de/data/test?foo=bar&leet=1337#whoot" )');
	assert.ok(Josie.utils.isUrl('https://www.google.de/data/test?foo=bar&leet=1337#whoot'), 'isUrl( "https://www.google.de/data/test?foo=bar&leet=1337#whoot" )');
	assert.ok(Josie.utils.isUrl('//google.de/data/test?foo=bar&leet=1337#whoot'), 'isUrl( "//google.de/data/test?foo=bar&leet=1337#whoot" )');
	assert.ok(Josie.utils.isUrl('//www.google.de/data/test?foo=bar&leet=1337#whoot'), 'isUrl( "//www.google.de/data/test?foo=bar&leet=1337#whoot" )');
	assert.ok( ! Josie.utils.isUrl('/data/test?foo=bar&leet=1337#whoot'), '! isUrl( "/data/test?foo=bar&leet=1337#whoot" )');
	assert.ok( ! Josie.utils.isUrl('http:\\google.de\data\test?foo=bar&leet=1337#whoot'), '! isUrl( "http:\\\\google.de\\data\\test?foo=bar&leet=1337#whoot" )');
	assert.ok( ! Josie.utils.isUrl('asd@asd.de'), '! isUrl( "asd@asd.de" )');
	assert.ok( ! Josie.utils.isUrl('10/12/2014'), '! isUrl( "10/12/2014" )');
	// isSelector (for JSONSelect)
	assert.ok(Josie.utils.isSelector('.content :nth-child(0)'), 'isSelector( ".content :nth-child(0)" )');
	assert.ok(Josie.utils.isSelector('.data .childs'), 'isSelector( ".data .childs" )');
	assert.ok( ! Josie.utils.isSelector('/data /childs'), '! isSelector( "/data /childs" )');
	assert.ok( ! Josie.utils.isSelector('$'), '! isSelector( "$" )');
	assert.ok( ! Josie.utils.isSelector('jQuery()'), '! isSelector( "jQuery()" )');
	// isNamespace
	assert.ok(Josie.utils.isNamespace('foo'), 'isNamespace( "foo" )');
	assert.ok(Josie.utils.isNamespace('foo.bar.Test'), 'isNamespace( "foo.bar.Test" )');
	assert.ok(Josie.utils.isNamespace('123.456.789'), 'isNamespace( "123.456.789" )');
	assert.ok( ! Josie.utils.isNamespace('123\456\789'), '! isNamespace( "123\\456\\789" )');
	assert.ok( ! Josie.utils.isNamespace('10/12/2014'), '! isNamespace( "10/12/2014" )');
	assert.ok( ! Josie.utils.isNamespace('http://google.de'), '! isNamespace( "http://google.de" )');
	//todo: we need fail-tests for all is***-methods
	// getParameter
	//assert.ok(Josie.utils.getParameter('test'), 'getParameter');
	// capitalize
	assert.equal(Josie.utils.capitalize('foo'), 'Foo', 'capitalize( "foo" ) == "Foo"');
	assert.equal(Josie.utils.capitalize('Bar'), 'Bar', 'capitalize( "Bar" ) == "Bar"');
	// htmlAttr2CamelCase
	assert.equal(Josie.utils.toCamelCase('data-test-foo'), 'dataTestFoo', 'toCamelCase( "data-test-foo" ) == "dataTestFoo"');
	assert.equal(Josie.utils.toCamelCase('src'), 'src', 'toCamelCase( "src" ) == "src"');
});

QUnit.test("josie-core namespaces & classes", function(assert) {
	// declare
	assert.ok(Josie.declare('com.nysoft.josie.test.Test'), 'Josie.declare("com.nysoft.josie.test.Test")');
	assert.equal(Josie.declare('com.nysoft.josie.test.Test'), com.nysoft.josie.test.Test, 'Josie.declare("com.nysoft.josie.test.Test") == com.nysoft.josie.test.Test');
	assert.notEqual(com.nysoft.josie.test.Test, null, 'com.nysoft.josie.test.Test != null');
	// getClass, classExists and require
	assert.equal(Josie.getClass('com.nysoft.josie.core.Control'), undefined, 'Josie.getClass("com.nysoft.josie.core.Control")');
	assert.ok( ! Josie.classExists('com.nysoft.josie.core.Control'), '! Josie.classExists("com.nysoft.josie.core.Control")');
	assert.equal(Josie.require('com.nysoft.josie.core.Control'), null, 'Josie.require("com.nysoft.josie.core.Control")');
	assert.notEqual(Josie.getClass('com.nysoft.josie.core.Control'), undefined, 'Josie.getClass("com.nysoft.josie.core.Control")');
	assert.ok(Josie.classExists('com.nysoft.josie.core.Control'), 'Josie.classExists("com.nysoft.josie.core.Control")');
	assert.equal(Josie.require('com.nysoft.josie.test.Test'), null, 'Josie.require("com.nysoft.josie.test.Test")');
});

QUnit.test('josie-core other stuff', function(assert) {
	assert.equal(typeof Josie.requestAnimationFrame, 'function', 'typeof jQuery.requestAnimationFrame == "function"');
	assert.equal(typeof Josie.userAgent, 'string', 'typeof jQuery.agent == "string"');
	assert.notEqual(Josie.device, null, 'jQuery.device != null');
	assert.notEqual(Josie.device.mode, null, 'jQuery.device.mode != null');
	assert.equal(typeof Josie.basePath, 'string', 'typeof jQuery.josieBasePath == "string"');
	assert.equal(typeof Josie.localRun, 'boolean', 'typeof jQuery.josieLocalRun == "string"');
});