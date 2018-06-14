// udp client

"use strict"

const LOCAL_PORT = 4001
const HOST_PORT = 4000
const LOCAL_ADDRESS = "192.168.0.23"
const HOST_ADDRESS = "159.203.241.253"

const dgram = require( "dgram" )

const client = dgram.createSocket( "udp4" )

client.on( "close", function () {
	console.log( "close" )
} )

client.on( "error", function ( error ) {
	console.log( "error", error )
} )

client.on( "listening", function () {
	const address = client.address()
	console.log( "listening", address.address, address.port )
} )

client.on( "message", function ( message, remote ) {
	console.log( "message", message.toString(), remote.address, remote.port )
} )

// client.bind( PORT, multicastAddress )
client.bind( LOCAL_PORT, function() {

} )
// client.bind( PORT )
