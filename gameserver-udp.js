// udp server

"use strict"

// const
const THREE = require( "three" )

var PORT = 33333
var HOST = "127.0.0.1"

var dgram = require( "dgram" )
var server = dgram.createSocket( "udp4" )

const players = []

server.on( "listening", function () {
	var address = server.address()
	console.log( 'server up ' + address.address + ":" + address.port )
	// server.setBroadcast(tr)
} )

server.on( "message", function ( message, remote ) {
	// server.address.address
	// server.address.port
	if ( message == "update" ) {

	} else {
		console.log( remote.address + ':' + remote.port + ' - ' + message )
	}

	const args = message.toString().split( " " )
	const arg0 = args[ 0 ]
	const arg1 = args[ 1 ]
	switch ( arg0 ) {
		case "a":
			switch ( arg1 ) {
				case "up":
					break
				case "down":
					break
				case "left":
					break
				case "right":
					break
			}
			break
		case "j":
			addPlayer( arg1, remote.address )
			break
		case "d":
			removePlayer( arg1, remote.address )
			break
	}
} )

const scene = new THREE.Scene()

function Player( args ) {
	this.username = args.username
	this.ip = args.ip
	this.body = new Body()
}

const bodies = []

function Body() {
	this.mesh = new THREE.Mesh(
		new THREE.BoxGeometry( 10, 10, 10, 10 ),
		new THREE.MeshBasicMaterial()
	)
	this.position = new THREE.Vector3( 0, 0, 0 )
	this.mesh.position.copy( this.position )

	this.velocity = new THREE.Vector3( 0, 0, 0 )
	scene.add( this.mesh )
	bodies.push( this )
}

Body.prototype.updatePhysics = function () {
	this.position.add( this.velocity )
}

setInterval( updatePhysics, 10 )
function updatePhysics() {
	for ( const body of bodies ) {
		body.updatePhysics()
	}
}

setInterval( updateNetwork, 100 )
function updateNetwork() {
	server.send( "update", PORT )
}

new Body()

function addPlayer( username, ip ) {
	players.push( new Player( {
		ip: ip,
		username: "test",
	} ) )
}

function removePlayer( username, ip ) {
	var i = players.findIndex( e => {
		return e.username === username && e.ip === ip
	} )
	players.splice( i, 1 )
}

server.bind( PORT, HOST )
