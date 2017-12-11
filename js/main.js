function enableFireballs() {
    $('body').on('mouseenter', '.fireball', function() {
        console.log("Ouch")
    })
}

function disableFireballs() {
    $('body').off('mouseenter')
}

$('body').on('click', '.star', function() {
    disableFireballs()
    setTimeout(function() {
        enableFireballs()
    }, 5000)
})

enableFireballs()