/*
 * Project: Mail Man Havoc - Space Edition
 * File: mailPilot.js
 * Purpose: JavaScript that runs the game
 * Authors: Krisztián Köves, Tien Liengtiraphan (Team KiloTango)
 * Date: 4/30/15
 */

/*
 * Declare global variables
 */

// game sprites
    var scene;
    var plane;
    var drone;
    var randomDrone;
    var planet;
    var asteroids;
    var space;
    var shield;
    var repair;
    
    // sounds
    var yayMp3;
    var themeMp3;
    var themeOgg;
    var theme;
    var laserMp3;
    var laserOgg;
    var explosionMp3;
    var alarmMp3;
    
    var score;
    var fireCount;
    
    // timers
    var themeTimer;
    var laserTimer;
    
    // lasers
    var laser1;
    var laser2;
    var laser3;
    
    // constants
    var SPACE_SPEED = 10;
    var NUM_ASTEROIDS = 5;
    var DELAY = .3; //delay for lasers shooting
    
    // boolean
    var delivered;
    var hardcore; // turns on Hardcore/FaceMelt Mode
    
    buildSounds = function(){
        yayMp3 = new Sound("assets/audio/Yay2.mp3");
        
        themeMp3 = new Sound("assets/audio/Mechanolith.mp3");
        themeOgg = new Sound("assets/audio/Mechanolith.ogg");
        theme = new Audio('assets/audio/Mechanolith.mp3');
        
        laserMp3 = new Sound("assets/audio/Laser.mp3");
        laserOgg = new Sound("assets/audio/Laser.ogg");
        
        explosionMp3 = new Sound("assets/audio/Explosion.mp3");
        
        alarmMp3 = new Sound("assets/audio/Alarm.mp3");
    }; // end buildSounds
    
    function Laser(owner) {
        tLaser = new Sprite(scene, "assets/images/lasers/laser_blue.png", 59, 95);
        tLaser2 = new Sprite(scene, "assets/images/lasers/laser_blue.png", 59, 95);
        tLaser3 = new Sprite(scene, "assets/images/lasers/laser_blue.png", 59, 95);
        tLaser4 = new Sprite(scene, "assets/images/lasers/laser_blue.png", 59, 95);
        tLaser5 = new Sprite(scene, "assets/images/lasers/laser_blue.png", 59, 95);
        
        tLaser.owner = owner;
        tLaser.hide();
        tLaser.setBoundAction(DIE);
        
        tLaser2.owner = owner;
        tLaser2.hide();
        tLaser2.setBoundAction(DIE);
        
        tLaser3.owner = owner;
        tLaser3.hide();
        tLaser3.setBoundAction(DIE);
        
        tLaser4.owner = owner;
        tLaser4.hide();
        tLaser4.setBoundAction(DIE);
        
        tLaser5.owner = owner;
        tLaser5.hide();
        tLaser5.setBoundAction(DIE);
        
        tLaser.fire = function() {
            this.setPosition(this.owner.x, this.owner.y);
            this.setSpeed(50);
            this.setMoveAngle(0);
            this.show();
        };
        
        tLaser2.fire = function() {
            this.setPosition(this.owner.x, this.owner.y);
            this.setSpeed(50);
            this.setMoveAngle(0);
            this.show();
        };
        
        tLaser3.fire = function() {
            this.setPosition(this.owner.x, this.owner.y);
            this.setSpeed(50);
            this.setMoveAngle(0);
            this.show();
        };
        
        tLaser4.fire = function() {
            this.setPosition(this.owner.x, this.owner.y);
            this.setSpeed(50);
            this.setMoveAngle(0);
            this.show();
        };
        
        tLaser5.fire = function() {
            this.setPosition(this.owner.x, this.owner.y);
            this.setSpeed(50);
            this.setMoveAngle(0);
            this.show();
        };
    }
    
    function Plane(){
        tPlane = new Sprite(scene, "assets/images/Ship.png", 114, 98);
        tPlane.setSpeed(0);
        tPlane.setPosition(400, 500);
        
        tPlane.laser = new Laser(tPlane);
        
        tPlane.followMouse = function(){
            this.setPosition(scene.getMouseX(), 500);
        };
        
        tPlane.checkBounds = function(){
            if(this.y > 600){
                this.setPosition(this.x, scene.height);
            }
            
            if(this.y < 0)
                this.setPosition(this.x, 0);
            
            if(this.x > 800){
                this.setPosition(scene.width, this.y);
            }
            
            if(this.x < 0)
                this.setPosition(0, this.y);
        };
        
        tPlane.checkKeys = function(){
            var SHIP_SPEED = 35;
            if(keysDown[K_W] || keysDown[K_UP]) {
                this.changeYby(-SHIP_SPEED);
            }
            
            if(keysDown[K_S] || keysDown[K_DOWN]){
                this.changeYby(SHIP_SPEED);
            }
            
            if(keysDown[K_A] || keysDown[K_LEFT]){
                this.changeXby(-SHIP_SPEED);
            }
            
            if(keysDown[K_D] || keysDown[K_RIGHT]){
                this.changeXby(SHIP_SPEED);
            }
            
            if(keysDown[K_Q] || keysDown[K_SPACE]){
                var elapsedTime = laserTimer.getElapsedTime();
                if(fireCount % 5 === 0 && elapsedTime > DELAY) {
                    tLaser.fire();
                    laserTimer.reset();
                    laserMp3 = new Sound("assets/audio/Laser.mp3");
                    laserMp3.play();
                }
                
                if(fireCount % 5 === 1 && elapsedTime > DELAY) {
                    tLaser2.fire();
                    laserMp3 = new Sound("assets/audio/Laser.mp3");
                    laserMp3.play();
                }
                
                if(fireCount % 5 === 2 && elapsedTime > DELAY) {
                    tLaser3.fire();
                    laserTimer.reset();
                    laserMp3 = new Sound("assets/audio/Laser.mp3");
                    laserMp3.play();
                }
                
                if(fireCount % 5 === 3 && elapsedTime > DELAY) {
                    tLaser4.fire();
                    laserTimer.reset();
                    laserMp3 = new Sound("assets/audio/Laser.mp3");
                    laserMp3.play();
                }
                
                if(fireCount % 5 === 4 && elapsedTime > DELAY) {
                    tLaser5.fire();
                    laserTimer.reset();
                    laserMp3 = new Sound("assets/audio/Laser.mp3");
                    laserMp3.play();
                }
                
                //play laser sound effects
                laserMp3.play();
                
                fireCount++;
            }
            
            tLaser.update();
            tLaser2.update();
            tLaser3.update();
            tLaser4.update();
            tLaser5.update();
        };
        
        return tPlane;
    } // end plane constructor
    
    function Repair() {
        tRepair = new Sprite(scene, "assets/images/repair/cog1.png", 64, 64);
        tRepair.setBoundAction(DIE);
        tRepair.hide();
        
        tRepair.spawnTimer = new Timer(); //determines when midflight repair will spawn
            
        tRepair.checkTime = function(){
            if(parseInt(tRepair.spawnTimer.getElapsedTime()) >= 120) {
                this.reset();
                this.spawnTimer.reset();
            }
        }
        tRepair.reset = function() {
            //reset speed and positioning of midflight repair
            this.setDY(SPACE_SPEED);
            this.setDX(0);
            
            var newX = parseInt(Math.random() * scene.width);
            var newY = parseInt(Math.random() * (scene.height/2));
            this.setPosition(newX, newY);
            this.show();
        }; // end reset
        
        return tRepair;
    }

    function Shield() {
        tShield = new Sprite(scene, "assets/images/shield/shieldUp.png", 64, 74);
        tShield.setBoundAction(DIE);
        tShield.hide();
        
        tShield.active = false;
        tShield.activeTimer = new Timer(); //how long shield will be active
        tShield.spawnTimer = new Timer(); //determines when shield powerup will spawn
        
        tShield.activate = function() {
            this.active = true;
            plane.setImage("assets/images/shipWithShield.png");
            this.activeTimer.reset();
            this.hide();
        };
        
        tShield.deactivate = function() {
            this.active = false;
            this.activeTimer.reset();
            plane.setImage("assets/images/Ship.png");
        };
        
        tShield.checkTime = function() {
            if(parseInt(this.spawnTimer.getElapsedTime()) >= 30) {
                this.reset();
                this.spawnTimer.reset();
            }
            
            if(this.active && parseInt(this.activeTimer.getElapsedTime()) === 10)
                this.deactivate();
        };
        
        tShield.reset = function() {
            //reset speed and positioning of shield powerup
            this.setDY(SPACE_SPEED);
            this.setDX(0);
            
            var newX = parseInt(Math.random() * scene.width);
            var newY = parseInt(Math.random() * (scene.height/2));
            this.setPosition(newX, newY);
            this.show();
        }; // end reset
        
//        tShield.checkBounds = function() {
//            if (this.y > scene.height) {
//                this.reset();
//            } // end if
//        }; // end checkBounds
        
        return tShield;
    }
    
    //add progress bar as makeshift health bar
    function healthUp() { 
        var tmp = document.getElementById('p1').value;
        document.getElementById("p1").value = tmp + 10;
    }

    function healthDn(num){
        var tmp = document.getElementById('p1').value;
        document.getElementById("p1").value = tmp - num;
    }
    
    function healthReset() {
        document.getElementById("p1").value = 100;
    }
    
    function Planet(){
        tPlanet = new Sprite(scene, "assets/images/planets/17.png", 100, 100);
        
        tPlanet.reset = function(){
            //choose random planet image
            var planetNum = parseInt(Math.random()*31) + 1; //makes random number from 1 to 31
            this.setImage("assets/images/planets/" + planetNum + ".png");
            
            delivered = false;
            
            //reset speed and positioning of planet
            this.setDY(SPACE_SPEED);
            this.setDX(0);
            newX = Math.random() * scene.width;
            this.setPosition(newX, -50);
        }; // end reset
        
        tPlanet.checkBounds = function(){
            if (this.y > scene.height){
                this.reset();
            } // end if
        }; // end checkBounds
        
        tPlanet.reset();
        
        return tPlanet;
    } // end planet
    
    function Drone(){
        tDrone = new Sprite(scene, "assets/images/Spaceships-Drakir/Spaceship-Drakir3.png", 76, 52);
        
        tDrone.reset = function(){
            //set random drone image (1-7)
            droneNum = parseInt(Math.random() * 7) + 1;
            this.setImage("assets/images/Spaceships-Drakir/Spaceship-Drakir" + droneNum + ".png");
            
//            this.setDX((Math.random() * 10) - 5);
            this.setDY((Math.random() * SPACE_SPEED) + 10);
            
            newX = Math.random() * scene.width;
            this.setPosition(newX, -50);
            
        }; // end reset
        
        tDrone.checkBounds = function(){
            if (this.y > scene.height){
                this.reset();
            } // end if
        }; // end checkBounds
        
        tDrone.followPlane = function() {
            this.setDX((plane.x - this.x) * .1);
        };
        
        tDrone.reset();
        
        return tDrone;
    }
    
    function randomDrone(){
        tDrone = new Sprite(scene, "assets/images/Spaceships-Drakir/Spaceship-Drakir3.png", 76, 52);
        
        tDrone.reset = function(){
            //set random drone image (1-7)
            droneNum = parseInt(Math.random() * 7) + 1;
            this.setImage("assets/images/Spaceships-Drakir/Spaceship-Drakir" + droneNum + ".png");
            
//            this.setDX((Math.random() * 10) - 5);
            this.setDY((Math.random() * SPACE_SPEED) + 10);
            
            newX = Math.random() * scene.width;
            this.setPosition(newX, -50);
            
        }; // end reset
        
        tDrone.checkBounds = function(){
            if (this.y > scene.height){
                this.reset();
            } // end if
        }; // end checkBounds
        
        tDrone.followPlane = function() {
            this.dx += ((plane.x - this.x) * .01);
        };
        
        tDrone.reset();
        
        return tDrone;
    }
    
    function Asteroid(){
        tAsteroid = new Sprite(scene, "assets/images/asteroids/Asteroid-A-10-0.png", 64, 64);
        
        tAsteroid.reset = function(){
            //set random asteroid image
            asteroidNum = parseInt(Math.random() * 60);
            this.setImage("assets/images/asteroids/Asteroid-A-10-" + asteroidNum + ".png");
            
            this.setDY((Math.random() * SPACE_SPEED) + 5);
            this.setDX((Math.random() * 10) - 5);
            newX = Math.random() * scene.width;
            this.setPosition(newX, -50);
        } // end reset
        
        tAsteroid.checkBounds = function(){
            if (this.y > scene.height){
                this.reset();
            } // end if
        } // end checkBounds
        
        tAsteroid.reset();
        
        return tAsteroid;
    } // end asteroid 
    
    function makeAsteroids(){
        asteroids = new Array(NUM_ASTEROIDS);
        for (i = 0; i < NUM_ASTEROIDS; i++){
            asteroids[i] = new Asteroid();
        } // end for
    } // end makeAsteroids
    
    function updateAsteroids(){
        for (i = 0; i < NUM_ASTEROIDS; i++){
            asteroids[i].update();
        } // end for
    } // end updateAsteroids
    
    function Space(){
        tSpace = new Sprite(scene, "assets/images/Background_orig.jpg", 800, 1440);
        tSpace.setDX(0);
        tSpace.setDY(SPACE_SPEED);
        tSpace.setPosition(400, 300);
        
        tSpace.checkBounds = function(){
           //seamless space gif repeats
        
            if (this.y > 720){
                this.setPosition(400, -120);
            } // end if
        }; // end checkBounds
        
        tSpace.checkKeys = function(){
            //used for testing space position
            if (keysDown[K_UP]){
                this.changeYby(-1);
            }
            if (keysDown[K_DOWN]){
                this.changeYby(1);
            }
            console.log("Space Y value: " + this.y);
        }; // end checkKeys
        
        return tSpace;
    } // end space
    
    function checkCollisions(){
        //plane on planet
        if (plane.collidesWith(planet)){
            if(!delivered){
                addScore(10);
                healthUp();
                yayMp3 = new Sound("assets/audio/Yay2.mp3");
                yayMp3.play();
            }
            delivered = true;
        } // end if
        
        //plane colliding with shield powerup
        if(plane.collidesWith(shield)) {
            shield.activate();
        }
        
        if(plane.collidesWith(drone)&& !shield.active){
            if(hardcore) healthDn(10);
            else healthDn(5);
        }
        
        if(plane.collidesWith(randomDrone)&& !shield.active){
            if(hardcore) healthDn(10);
            else healthDn(5);
        }
        
        if(plane.collidesWith(repair)){
            yayMp3 = new Sound("assets/audio/Yay2.mp3");
            yayMp3.play();
            healthReset();
            repair.hide();
        }
        
        //plane and laser collisions with asteroid
        for (i = 0; i < NUM_ASTEROIDS; i++){
            if (plane.collidesWith(asteroids[i]) && !shield.active){
                healthDn(10);
                alarmMp3.play();
                explosionMp3.play();
                asteroids[i].reset();
            } // end if
            
            if(tLaser.collidesWith(asteroids[i])) {
                asteroids[i].reset();
                addScore(1);
                
                explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                explosionMp3.play();
            }
            
            if(tLaser2.collidesWith(asteroids[i])) {
                asteroids[i].reset();
                addScore(1);
                
                explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                explosionMp3.play();
            }
            
            if(tLaser3.collidesWith(asteroids[i])) {
                asteroids[i].reset();
                addScore(1);
                
                explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                explosionMp3.play();
            }
            
             if(tLaser4.collidesWith(asteroids[i])) {
                asteroids[i].reset();
                addScore(1);
                
                explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                explosionMp3.play();
            }
            
             if(tLaser5.collidesWith(asteroids[i])) {
                drone.reset();
                addScore(1);
                
                explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                explosionMp3.play();
            }
            
            if(tLaser.collidesWith(drone)) {
                drone.reset();
                addScore(5);
                
                explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                explosionMp3.play();
            }
            
            if(tLaser2.collidesWith(drone)) {
                drone.reset();
                addScore(5);
                
                explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                explosionMp3.play();
            }
            
            if(tLaser3.collidesWith(drone)) {
                drone.reset();
                addScore(5);
                
                explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                explosionMp3.play();
            }
            
             if(tLaser4.collidesWith(drone)) {
                drone.reset();
                addScore(5);
                
                explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                explosionMp3.play();
            }
            
             if(tLaser5.collidesWith(drone)) {
                drone.reset();
                addScore(5);
                
                explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                explosionMp3.play();
            }
            
            if(hardcore){
                if(tLaser.collidesWith(planet)) {
                    planet.reset();
                    addScore(-5);

                    explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                    explosionMp3.play();
                }

                if(tLaser2.collidesWith(planet)) {
                    planet.reset();
                    addScore(-5);

                    explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                    explosionMp3.play();
                }

                if(tLaser3.collidesWith(planet)) {
                    planet.reset();
                    addScore(-5);

                    explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                    explosionMp3.play();
                }

                 if(tLaser4.collidesWith(planet)) {
                    planet.reset();
                    addScore(-5);

                    explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                    explosionMp3.play();
                }

                 if(tLaser5.collidesWith(planet)) {
                    planet.reset();
                    addScore(-5);

                    explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                    explosionMp3.play();
                }
            }
            
            if(tLaser.collidesWith(randomDrone)) {
                randomDrone.reset();
                addScore(5);
                
                explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                explosionMp3.play();
            }
            
            if(tLaser2.collidesWith(randomDrone)) {
                randomDrone.reset();
                addScore(5);
                
                explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                explosionMp3.play();
            }
            
            if(tLaser3.collidesWith(randomDrone)) {
                randomDrone.reset();
                addScore(5);
                
                explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                explosionMp3.play();
            }
            
             if(tLaser4.collidesWith(randomDrone)) {
                randomDrone.reset();
                addScore(5);
                
                explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                explosionMp3.play();
            }
            
             if(tLaser5.collidesWith(randomDrone)) {
                randomDrone.reset();
                addScore(5);
                
                explosionMp3 = new Sound("assets/audio/Explosion.mp3");
                explosionMp3.play();
            }
        } // end for
    } // end checkCollisions
    
    function init(){
        scene = new Scene();
        scene.hideCursor();
        
        //add virtual joystick if possible
        if (scene.touchable){
            joy = new Joy();
        } // end if
        
        buildSounds();
        
        plane = new Plane();
        drone = new Drone();
        randomDrone = new randomDrone();
        repair = new Repair();
        
        planet = new Planet();
        makeAsteroids();
        space = new Space();
        shield = new Shield();
        repair = new Repair();
        
        themeMp3.play();
        themeTimer = new Timer();
        themeTimer.reset();
        
        laserTimer = new Timer();
        
        score = 0;
        fireCount = 0;
        
        //boolean values
        delivered = false;
        hardcore = false;
        
        document.getElementById("splash").style.display = "none";
        document.getElementById("instructions").style.display = "none";
        document.getElementById("closeInstruct").style.display = "none";
        document.getElementById("toObjectives").style.display = "none";
        document.getElementById("objectives").style.display = "none";
        document.getElementById("toInstructions").style.display = "none";
        
        scene.start();
    }  // end init
    
    function addScore(num){
        score += num;
        document.getElementById("score").innerHTML = score;
        document.getElementById("spnDeath").innerHTML = score;
    }
    
    function toggleHardcore() {
        // invert hardcore boolean, false->true, true->false
        hardcore = !hardcore;
        
        // if hardcore mode is off
        if(!hardcore){
            document.getElementById("hardcoreButtonImg").src = "assets/images/splash/hardcoreOn.png";
            document.getElementById("sideNote").style.display = "none";
        }
        else{
            document.getElementById("hardcoreButtonImg").src = "assets/images/splash/hardcoreOff.png";
            document.getElementById("sideNote").style.display = "block";
       }
   }
    
    function update(){
        var health = parseInt(document.getElementById("p1").value);
        
        if(parseInt(themeTimer.getElapsedTime()) === 50) {
            themeMp3 = new Sound("assets/audio/Mechanolith.mp3");
            themeTimer.reset();
            themeMp3.play();
        }
        
        scene.clear();
        
//        plane.followMouse();
        
        
        space.update();
        
        if(health > 0) {
            planet.changeImgAngleBy(1.5); //give planets a rotation
        
            plane.checkKeys();
            plane.update();
            
            drone.followPlane();
            drone.update();
            
            randomDrone.followPlane();
            randomDrone.update();
            
            updateAsteroids();
            
            planet.update();
            
            shield.checkTime();
            shield.update();
            
            repair.update();
            repair.checkTime();
            
            checkCollisions();
        }
        
        if(health <= 0) {
            explosionMp3.play();
            explosionMp3 = new Sound("assets/audio/Silence.mp3");
            themeMp3 = new Sound("assets/audio/Silence.mp3");
            
            document.getElementById("divDeath").style.display = "block";
            document.getElementById("scoreDiv").style.display = "none";
            document.getElementById("health").style.display = "none";
            
            scene.showCursor();
        }
        
        
    } // end update();
    
    function resetGame() {
        healthReset();
        buildSounds();
        drone.reset();
        
        document.getElementById("splash2").style.display = "none";
        document.getElementById("divDeath").style.display = "none";
        document.getElementById("scoreDiv").style.display = "block";
        document.getElementById("instructions").style.display = "none";
        document.getElementById("health").style.display = "block";
        document.getElementById("closeInstruct").style.display = "none";
        document.getElementById("toObjectives").style.display = "none";
        document.getElementById("objectives").style.display = "none";
        document.getElementById("toInstructions").style.display = "none";
        
        
        plane.setImage("assets/images/Ship.png");
        shield.active = false;
        
        plane.setPosition(400, 500);
        
        scene.hideCursor();
        score = 0;
        fireCount = 0;
        document.getElementById("score").innerHTML = 0;
    }
    
    function quit() {
        document.getElementById("splash2").style.display = "block";
        document.getElementById("divDeath").style.display = "none";
        
//        scene.stop();
//        scene.clear();
    }
    
    function showHelp() {
        document.getElementById("instructions").style.display = "block";
        document.getElementById("objectives").style.display = "none";
        document.getElementById("closeInstruct").style.display = "block";
        document.getElementById("toObjectives").style.display = "block";
        document.getElementById("toInstructions").style.display = "none";
    }
    
    function closeHelp(){
        document.getElementById("instructions").style.display = "none";
        document.getElementById("objectives").style.display = "none";
        document.getElementById("closeInstruct").style.display = "none";
        document.getElementById("toObjectives").style.display = "none";
    }
    
    function toObjective(){
        document.getElementById("objectives").style.display = "block";
        document.getElementById("toInstructions").style.display = "block";        
        document.getElementById("toObjectives").style.display = "none";
        document.getElementById("instructions").style.display = "none";
        document.getElementById("closeInstruct").style.display = "none";
    }
    
    function toInstruction(){
        document.getElementById("instructions").style.display = "block";
        document.getElementById("toObjectives").style.display = "block";
        document.getElementById("closeInstruct").style.display = "block";        
        document.getElementById("objectives").style.display = "none";
        document.getElementById("toInstructions").style.display = "none";
    }