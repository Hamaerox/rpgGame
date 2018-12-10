
var ask = require('readline-sync');
var isAlive = true;
var enemy = new Enemy("Wrynn", 20, 20)
var player = new Player("Tim", 100, 20)
var enemyKilled = 0;
var inventory = 1;

var playerName = ask.question("You wake up very groggy and disorientated and realize you're in a village that appears to be on fire. You notice the colors in front of you start to change and a figure starts materializing in front of you. The figure speaks: 'My name is Hamaerox young traveler! What should I call you?' \n")
ask.question(`It's a pleasure to meet you ${playerName}! I will be your guide during this adventure. ${playerName}, you are about to embark on a very trecherous endeavor that could have life threatening consequences but even greater rewards. *Press enter to continue*\n`)
ask.keyIn(`${playerName}, using the "W" key will allow you to walk around the village, you can also press the "Q" key to quit the game; alternatively, you can press "S" to view your stats. While walking, you will encounter the beasts plagueing this village. If you manage to slay these beasts you will earn some HealthPoints and a special Item that will be stored in your inventory. ${playerName}, did you get all that? \n`, {limit: "y"})
ask.keyIn(`Great! Well ${playerName}, as you can see there are creatures all around us terrorizing this village. The villagers desperately need your help! *Hamaerox holds out his hand, in it appears a sword and hands it to you* You will need this. I wish you good luck! Press "c" to continue \n`, {limit: ['c']})

while(isAlive){
    var walk = ask.keyIn(`${playerName} What would you like to do? \n`, {limit: ["w", "q", "s"]}) 
        if(walk === "w"){
            battleChance()
            console.log("You walk forward briefly")
        } else if(walk === "s"){
            console.log(`${playerName} has ${player.hp}HP and ${inventory} Gold pieces.`)
        } else if(walk === "q"){
            ask.keyIn(`Hamaerox materializes and looks awkwardly at you. After a brief stare of disappointment Hamaerox says, "Are you sure you want to let the people of this village perish ${playerName}? `,{limit: ["y"]})
            console.log(`Hamaerox says, "You're a coward" and disappears as quickly as he appeared. The wind picks up and with a flash Hamaerox appears, with a mighty lung he pierces your heart with the sword Excalibur. Death is instant.`)
            break;
        }
}

function battleChance(){
    var a = (Math.floor(Math.random() * 3))
    var runAway = (Math.floor(Math.random() * 3))
    if(a === 1){
        newEnemy()
        console.log(`${enemy.name} appeared`)
        var run = ask.keyIn('You can Fight "f" or run "r. What would you like to do? ', {limit: ["f", "r"]})
        if(run === "r"){
            if(runAway === 3 || runAway === 2){
                console.log("You ran away successfully")
            } else {
                console.log(`You seem to be unlucky. You tried to run away but the ${enemy.name} follows you forcing you to fight or die so you turn and fight.`)
                battle()  
            }
        } else if(run === "f") {
            console.log(`You're a true champion! You stand and fight the ${enemy.name}`)
            battle()
        }
    } else {
        console.log("You didn't run into any enemies")
    }
}

function newEnemy(){
    var b = (Math.floor(Math.random() * 3))
    if(b === 0){
    enemy = new Enemy("Dragon", 40)
    } else if(b === 1){
    enemy = new Enemy("Wrynn", 25)
    } else if(b === 2){
    enemy = new Enemy("Hatchling", 10)
}
}

function Player(playerName, hp){
    this.name = playerName
    this.hp = hp
    this.attack = function(){
        var pAttack = (Math.floor(Math.random() * 40) + 15)
        return pAttack
    }
}

function Enemy(name, hp){
    this.name = name
    this.hp = hp
    this.attack = function(){
        var eAttack = (Math.floor(Math.random() * 15) + 5)
        return eAttack
    }
}

function battle(){
    while(enemy.hp > 1){
        var eThisAttack = enemy.attack()
        var pThisAttack = player.attack()
    enemy.hp -= pThisAttack
    console.log(`${playerName} attacked ${enemy.name} for ${pThisAttack}`)
    player.hp -= eThisAttack
    console.log(`${enemy.name} attacked ${playerName} for ${eThisAttack}`)
    console.log(`${player.name} now has ${player.hp}hp while ${enemy.name} now has ${enemy.hp}\n`)
    if(player.hp <= 1){
        console.log(`${playerName} put up a valiant fight but in the end was overtaken by the creatures haunting the village and was eaten alive. \n GAME OVER`)
        isAlive = false; 
    } else if(enemy.hp < 1){
            player.hp += 25;
            console.log(`With one final yelp ${enemy.name} dies. ${playerName} receives 25 health for slaying ${enemy.name}. ${playerName} received a piece of gold. You now have ${player.hp}hp and ${inventory} Gold pieces.`)
            enemyKilled += 1;
            inventory += 1;  
            if(enemyKilled === 5){
                console.log(`Hamaerox materializes in front of you and greets you with a giant smile and a group of people. "Champion!! Look before you! These are the townspeople of this village. You have slain all the wretched creatures that have been wreaking havoc upon them." Thank you!\n You win!`)
                isAlive = false;
                break;
            }
        }
    }
}







