var clientId='ifuturex70sh5dl3',
	timestamp=Math.floor(new Date().getTime()),
	clientSecret = 'ub21t5m4ypokcetebd7x082lar1frzu4';
var signParam = function(){
	var query = `clientId=${clientId}&timestamp=${timestamp}`,
		query2 = `clientId${clientId}timestamp${timestamp}`;
	return `?${query}&sign=${$.md5(clientSecret + query2 + clientSecret).toUpperCase()}`
}
/*console.log('chaogege')
console.log(signParam())
console.log($.md5('1234'))
console.log('chaogege')*/