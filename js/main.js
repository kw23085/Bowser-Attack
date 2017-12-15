var $body = $('body')
var players = [{name: "mario", score: 0}, {name: "luigi", score: 0}]
var game = {
    currentPlayer: players[0]
}
var timeCounter
var newTime = 0
var fireBallShooter
var start = new Date;

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
        dieSound.play()
        console.log("Ouch")
        backgroundMusic.pause()
        dieSound.play()
        alert('you died your score was ' + $('#timer-value').text())
        $('.fireball').remove()
        $('.boss').remove()
        game.currentPlayer.score = Number($('#timer-value').text())
        clearTime()
        clearFireBall()
        clearStar()
        $('#timer-value').text(0);
        var $startAgainBtn = $('<button>Start Player 2</button>')
        $startAgainBtn.addClass('startagainbtn')
        // check if the currentPlayer is players[0] then we change to the next player and
        // we delete all the balls and boss from the dom and we stop the clock and stop everything
        //and then start the game again
        //
        // else if the currentPlayer is players[1] it means it's game over
        $body.append($startAgainBtn)
    })
}

// turn off fireball effect
function disableFireballs() {
    $('body').off('mouseenter', '.fireball')
}

// boss effect
function enableBossEffect() {
    $('body').on('mouseenter', '.boss', function() {
        backgroundMusic.pause()
        dieSound.play()
        alert('you died your score was ' + $('#timer-value').text())
        $('.fireball').remove()
        $('.boss').remove()
        game.currentPlayer.score = Number($('#timer-value').text())
        clearTime()
        clearFireBall()
        clearStar()
        $('#timer-value').text(0);
        var $startAgainBtn = $('<button>Start Player 2</button>')
        $startAgainBtn.addClass('startagainbtn')
        // check if the currentPlayer is players[0] then we change to the next player and
        // we delete all the balls and boss from the dom and we stop the clock and stop everything
        //and then start the game again
        //
        // else if the currentPlayer is players[1] it means it's game over
        $body.append($startAgainBtn)
    })
}



// turn off boss effect
function disableBossEffect() {
    $('body').off('mouseenter', '.boss')
}

// what happens after you get star
    $('body').on('mouseenter', '.star', function() {
    starSound.play()
    disableFireballs()
    disableBossEffect()
    setTimeout(function() {
        enableFireballs()
        enableBossEffect()
    }, 10000)
    $(this).remove()
})

// decides if the fireball should increase or decrease to right or left
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

// start game button
var $startbtn = $('.startbtn')

$startbtn.on('click', startGame)
$startbtn.on('mouseenter', function() {
    startSound.play()
})

function startGame() {
    $body.css('cursor', 'url(./pictures/mariosmall.png), auto')
    backgroundMusic.play()
    enableFireballs()
    startMovingBoss()
    enableBossEffect()
    
// start intervals
    myTimer()
    fireballTimer()
    starTimer()
}

function myTimer() {
    timeCounter = setInterval(function() {
        newTime += 1
        // newTime = Math.round((new Date - start) / 1000)
        $('#timer-label').text('Time: ')        
        $('#timer-value').text(newTime);
    }, 1000)
}

function myTimer2() {
    timeCounter = setInterval(function() {
        newTime += 1
        $('#timer-label').text('Time: ')        
        $('#timer-value').text(newTime);
    }, 1000)
}

function starTimer() {
    starGenerator = setInterval(function() {
        generateStar()
    }, 27000)
    $startbtn.remove()
}

function fireballTimer() {
    fireballShooter = setInterval(function() {
        fireBallSound.play()
        shootFireBall()
    }, 2700)
}

function clearTime() {
    clearInterval(timeCounter)
    timeCounter = 0
    newTime = 0
}

function clearFireBall() {
    clearInterval(fireballShooter)
}

function clearStar() {
    clearInterval(starGenerator)
}

$('body').on('click', '.startagainbtn', startAgain)

function startAgain() {
    startGame()
    timeCounter = 0  
}

// all sound effects
var dieSound = new Audio("./soundeffects/die.wav")
var starSound = new Audio("./soundeffects/stareffectshort.mp3")
var fireBallSound = new Audio("./soundeffects/fireball.wav")
var startSound = new Audio("./soundeffects/letsgomario.wav")
var backgroundMusic = new Audio("./soundeffects/castle.mp3")

//activate functions at the begining of the game
//   enableFireballs()
//   startMovingBoss()
//   enableBossEffect()