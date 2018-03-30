function openDialog(name) {
	$(name).modal('show')
}

function closeDialog(name) {
	$(name).modal('hide')
}

function getCookie(name) {
	return Cookies.set(name)
}

function setCookie(name,value) {
	Cookies.set(name,value)
}