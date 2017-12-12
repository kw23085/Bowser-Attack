var $body = $('body')

// creates boss
function startMovingBoss() {
    var $newBoss = $('<div>')
    $newBoss.addClass('boss')
    var randomTop = Math.floor(Math.random() * (window.innerHeight - 150))
    var randomLeft = Math.floor(Math.random() *(window.innerWidth -150))
    $newBoss.css({
        top: randomTop,
        left: randomLeft,
    })

    // animate to move the boss around
function moveBoss(boss) {
     boss.animate({
         top: Math.floor(Math.random() * (window.innerHeight - 150)),
         left: Math.floor(Math.random() * (window.innerWidth - 150)),
     }, 2000, function() {
         moveBoss(boss)
})
}

   // append boss div to body
   $body.append($newBoss)
   moveBoss($newBoss)
}


// fireball effect
function enableFireballs() {
    $('body').on('mouseenter', '.fireball', function() {
        console.log("Ouch")
    })
}

// turn off fireball effect
function disableFireballs() {
    $('body').off('mouseenter', '.fireball')
}

// what happens after you get star
$('body').on('mouseenter', '.star', function() {
    disableFireballs()
    setTimeout(function() {
        enableFireballs()
    }, 10000)
    $(this).remove()
})

// generate fireball
function shootFireBalls() {
    var $newFireBall = $('<div>')
    $newFireBalls.addClass('fireball')
}

// generate star at random location
function generateStar() {
    var $newStar = $('<div>')
    $newStar.addClass('star')

    var randomTop = Math.floor(Math.random() * (window.innerHeight - 50))
    var randomLeft = Math.floor(Math.random() * (window.innerWidth - 50))

    $newStar.css({
        top: randomTop,
        left: randomLeft,
    })

    $body.append($newStar)
}
    

enableFireballs()