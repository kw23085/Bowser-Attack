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

// boss effect
function enableBossEffect() {
    $('body').on('mouseenter', '.boss', function() {
        console.log("Ouch")
    })
}

// turn off boss effect
function disableBossEffect() {
    $('body').off('mouseenter', '.boss')
}

// what happens after you get star
    $('body').on('mouseenter', '.star', function() {
    disableFireballs()
    disableBossEffect()
    setTimeout(function() {
        enableFireballs()
        enableBossEffect()
    }, 10000)
    $(this).remove()
})

// decides if the fireball should increase or decrease to or left
function randomDirection() {
    if(Math.round(Math.random())) {
        return 1
    } else {
        return -1
    }
}

// generates a speed in a given direction
function randomVelocity() {
    return {
        top: randomDirection() * Math.round(Math.random() * 20),
        left: randomDirection() * Math.round(Math.random() * 20)
    }
}

// generate fireball
function shootFireBall() {
    var velocity = randomVelocity()
    var $newFireBall = $('<div>')
    $newFireBall.addClass('fireball')
    $newFireBall.attr('data-velocity-top', velocity.top)
    $newFireBall.attr('data-velocity-left', velocity.left)

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

// flip fireball direction
        if($newFireBall.offset().top <= 0 || ($newFireBall.offset().top >= window.innerHeight - $newFireBall.height())) {
            $newFireBall.data('velocity-top', $newFireBall.data('velocity-top') * -1)
        }

        if($newFireBall.offset().left <= 0 || ($newFireBall.offset().left >= window.innerWidth - $newFireBall.width())) {
            $newFireBall.data('velocity-left', $newFireBall.data('velocity-left') * -1)
        }

// speed and direction of the fireball
        $newFireBall.css({
            top: "+=" + $newFireBall.data('velocity-top'),
            left: "+=" + $newFireBall.data('velocity-left'),
        })
    }, 50)
    
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
    
// remove star 10 sec after its generated
     setTimeout(function() {
         $newStar.remove();
     }, 10000);
}

// generate star every 27 sec
setInterval(function() {
    generateStar()
}, 27000);

// generate fireball every 2.7 sec
setInterval(function() {
    shootFireBall()
}, 2700);


// create timer
var start = new Date;

setInterval(function() {
    var newTime = Math.round((new Date - start) / 1000)
    $('.timer').text("Time: " + newTime + " Seconds");
}, 1000);

// activate functions at the begining of the game
  enableFireballs()
  startMovingBoss()
  enableBossEffect()