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

// boss effect
function enableBossEffect() {
    $('body').on('mouseenter', '.boss', function() {
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
function shootFireBall() {
    var $newFireBall = $('<div>')
    $newFireBall.addClass('fireball')

// make fireball appear at where the boss is at
    var $bowser = $('.boss')
    var bowserY = $bowser.offset().top + ($bowser.height() / 2)
    var bowserX = $bowser.offset().left + ($bowser.width() / 2)
    $newFireBall.css({
        top: bowserY,
        left: bowserX,
    })

// make the fireball move randomly
    setInterval(function() {
        var xdir = -1
        $newFireBall.css({
            top: "+=5px",
            left: "-=5px" ,
        })

    }, 100)
    $body.append($newFireBall)
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
    
// remove star after 10 sec after its generated
     setTimeout(function() {
         $newStar.remove();
     }, 10000);
 }

 // generate star every 30 sec
 setInterval(function() {
    generateStar()
}, 30000);

// generate fireball every 3 sec
setInterval(function() {
    shootFireBall()
}, 3000);

// activate functions at the begining of the game
enableFireballs()
startMovingBoss()
enableBossEffect()