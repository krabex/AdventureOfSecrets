/****************************************
 *  AOS - Adventure of secrets          *
 *  data.js                             *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/
 
/* CData contains game configuration:
    * sprites config
    * particles config
    * spells config
    * character config
    * levels data
*/
function CData() {
    // sprites
    this.characterAnimations = {
        "default":  {"id":  0, "speed":   0, "length": 1},
        "left":     {"id":  1, "speed": 800, "length": 4}, 
        "right":    {"id":  2, "speed": 800, "length": 4},
        "up":       {"id":  3, "speed": 800, "length": 4}
    };
    
    this.sprites = {"player1" : {
                        "atlas": "sprites", 
                        "width": 32, "height": 48, 
                        "animations": this.characterAnimations
                        },
                    "player2" : {
                        "atlas": "sprites",
                        "width": 32, "height": 48,
                        "animations": this.characterAnimations
                        },
                    "player3" : {
                        "atlas" : "sprites",
                        "width" : 32, "height" : 56,
                        "animations": this.characterAnimations
                        },
                    "darkWizard" : {
                        "atlas" : "sprites",
                        "width" : 32, "height" : 48,
                        "animations": this.characterAnimations
                        },
                    "nightWizard" : {
                        "atlas" : "sprites",
                        "width" : 32, "height" : 48,
                        "animations": this.characterAnimations
                        },
                    "death" : {
                        "atlas" : "sprites",
                        "width" : 32, "height" : 48,
                        "animations": this.characterAnimations
                        },
                    "devil" : {
                        "atlas" : "sprites",
                        "width" : 32, "height" : 48,
                        "animations": this.characterAnimations
                        },
                    "bloodElf" : {
                        "atlas" : "sprites",
                        "width" : 32, "height" : 48,
                        "animations": this.characterAnimations
                        },
                    "warriorElf" : {
                        "atlas" : "sprites",
                        "width" : 32, "height" : 48,
                        "animations": this.characterAnimations
                        },
                    "forestElf" : {
                        "atlas" : "sprites",
                        "width" : 32, "height" : 48,
                        "animations": this.characterAnimations
                        },
                    "fireWizard" : {
                        "atlas" : "sprites",
                        "width" : 32, "height" : 48,
                        "animations": this.characterAnimations
                        },
                    "guide" : {
                        "atlas" : "sprites",
                        "width" : 32, "height" : 48,
                        "animations": this.characterAnimations
                        }
                    };
    // particles
    this.particles = {  "magicSparks"   : { maxParticles: 32, positionRandom: Vector.create(4,4), emissionOffset: 0, size: 10, sizeRandom: 15, sharpness: 24, sharpnessRandom: 10, speed: 0.6, speedRandom: 1.0, lifeSpan: 9, lifeSpanRandom: 7, angle: 0, angleRandom: 360, gravity: Vector.create(0.1,0.1), gravityType: 2, startColour: [25,165,230,1], startColourRandom: [62,60,60,0], endColour: [245,35,0,0], endColourRandom: [60,60,60,0], style: 1},
                        "magicField"    : { maxParticles: 32, positionRandom: Vector.create(TILE_SIZE/2,TILE_SIZE/2), emissionOffset: 0, size: 10, sizeRandom: 15, sharpness: 24, sharpnessRandom: 10, speed: 0.6, speedRandom: 1.0, lifeSpan: 9, lifeSpanRandom: 7, angle: 0, angleRandom: 360, gravity: Vector.create(0.1,0.1), gravityType: 2, startColour: [25,165,230,1], startColourRandom: [62,60,60,0], endColour: [245,35,0,0], endColourRandom: [60,60,60,0], style: 1},
                        "fireBall"      : { maxParticles: 42, positionRandom: Vector.create(6,7), emissionOffset: 0, size: 19, sizeRandom: 15, sharpness: 40, sharpnessRandom: 10, speed: 2.6, speedRandom: 1.5, lifeSpan: 9, lifeSpanRandom: 7, angle: 0, angleRandom: 360, gravity: Vector.create(0.1,0.1), gravityType: 2, startColour: [250,218,68,1], startColourRandom: [62,60,60,0], endColour: [245,35,0,0], endColourRandom: [60,60,60,0], style: 1},
                        "fireExplosion" : { maxParticles: 92, positionRandom: Vector.create(16,15), emissionOffset: 0, size: 58, sizeRandom: 15, sharpness: 38, sharpnessRandom: 10, speed: 7.8, speedRandom: 1.5, lifeSpan: 9, lifeSpanRandom: 7, angle: 0, angleRandom: 360, gravity: Vector.create(0.1,0.1), gravityType: 2, startColour: [250,218,68,1], startColourRandom: [62,60,60,0], endColour: [245,35,0,0], endColourRandom: [60,60,60,0], style: 1},
                        "greenAura"     : { maxParticles: 42, positionRandom: Vector.create(10,10), emissionOffset: 100, size: 32, sizeRandom: 15, length: 30, lengthRandom: 15, speed: 6.0, speedRandom: 1.5, lifeSpan: 9, lifeSpanRandom: 4, angle: 0, angleRandom: 360, gravity: Vector.create(0.1,0.1), gravityType: 1, startColour: [14,232,28,0.5], startColourRandom: [62,60,60,0], endColour: [0,204,255,0], endColourRandom: [60,60,60,0], style: 2},
                        "blueAura"      : { maxParticles: 64, positionRandom: Vector.create(10,10), emissionOffset: 64, size: 35, sizeRandom: 15, sharpness: 8, sharpnessRandom: 10, speed: 1, speedRandom: 0, lifeSpan: 10, lifeSpanRandom: 5, angle: 0, angleRandom: 360, gravity: Vector.create(0.1,0.1), gravityType: 1, startColour: [0,136,255,1], startColourRandom: [62,60,60,0], endColour: [140,0,255,0], endColourRandom: [60,60,60,0], style: 1},
                        "freezing"      : { maxParticles: 24, positionRandom: Vector.create(26,26), emissionOffset: 0, size: 62, sizeRandom: 15, length: 16, lengthRandom: 4, speed: 0, speedRandom: 0, lifeSpan: 9, lifeSpanRandom: 7, angle: 0, angleRandom: 360, gravity: Vector.create(0.1,0.1), gravityType: 2, startColour: [76,168,230,1], startColourRandom: [62,60,60,0], endColour: [0,21,255,0], endColourRandom: [60,60,60,0.51], style: 2},
                        "poison"        : { maxParticles: 12, positionRandom: Vector.create(18,18), emissionOffset: 0, size: 30, sizeRandom: 15, sharpness: 16, sharpnessRandom: 12, speed: 1, speedRandom: 1.5, lifeSpan: 9, lifeSpanRandom: 7, angle: 0, angleRandom: 360, gravity: Vector.create(0.1,0.1), gravityType: 2, startColour: [34,135,24,1], startColourRandom: [62,60,60,0], endColour: [40,214,61,0], endColourRandom: [60,60,60,0], style: 1},
                        "fire"          : { maxParticles: 10, positionRandom: Vector.create(20,4), emissionOffset: 0, size: 21, sizeRandom: 15, sharpness: 8, sharpnessRandom: 10, speed: 3.6, speedRandom: 1.5, lifeSpan: 6, lifeSpanRandom: 7, angle: 262, angleRandom: 0, gravity: Vector.create(0.1,0.1), gravityType: 2, startColour: [250,218,68,1], startColourRandom: [62,60,60,0], endColour: [245,35,0,0], endColourRandom: [60,60,60,0], style: 1}};
    // spells
    this.spells = { "fireBall"      : { "gesture" : "22500" , "mana" : 10, "efficiency": [12, 24, 36], "create" : function(){ return new CFireBallSpell(); } },
                    "fireArrows"    : { "gesture" : "7755775577", "mana" : 15, "efficiency": [16, 36, 60], "create" : function() { return new CFireArrowsSpell(); }},
                    "haste"         : { "gesture" : "66556600", "mana": 10, "description" : "Increase player speed", "create" : function() { return new CHasteSpell(); }},
                    "explosion"     : { "gesture" : "77113355", "mana" : 21, "efficincy": [25, 45, 65], "create" : function() { return new CExplosionSpell(); }},
                    "evilEye"       : 0,
                    "beam"          : 0,
                    "heal"          : { "gesture" : "0003355", "mana" : 15, "efficiency": [25, 50, 80], "create" : function(){ return new CHealSpell(); }},
                    "poisonedLeaf"  : { "gesture" : "550077110033", "mana" : 17, "efficiency": [25, 45, 65], "create" : function(){ return new CPoisonedLeafSpell(); }},
                    "rip"           : 0,
                    "fog"           : 0,
                    "vines"         : 0,
                    "horror"        : 0,
                    "ice"           : { "gesture" : "70563412", "mana" : 16, "efficiency": [9, 30, 66], "create" : function() { return new CIceSpell(); }},
                    "protect"       : { "gesture" : "7766442233", "mana" : 17, "description" : "Increase player defence ability.", "create" : function(){ return new CProtectSpell();} },
                    "light"         : 0,
                    "wind"          : 0,
                    "needles"       : 0,
                    "lighting"      : 0,
                    "shielding"     : 0,
                    "enchant"       : 0,
                    "airBrust"      : 0,
                    "slice"         : 0,
                    "windGrasp"     : 0,
                    "soulLink"      : 0};
    this.fireSpells = ["fireBall", "fireArrows", "haste", "explosion", "evilEye", "beam"];
    this.acidSpells = ["heal", "poisonedLeaf", "rip", "fog", "vines", "horror"];
    this.natureSpells = ["ice", "protect", "light", "wind", "needles", "lighting"];
    this.blackSpells = ["shielding", "enchant", "airBrust", "slice", "windGrasp", "soulLink"];
    // characters
    this.characters = { "darkWizardd" : {
                            "sprite" : "darkWizard",
                            "maxMana" : 200,
                            "maxHealth" : 150,
                            "manaRegeneration" : 1,
                            "spells" : { "fireArrows": 3, "fireBall" : 0, "ice": 3, "heal" : 1, "poisonedLeaf" : 2 },
                            "AI" : "simple",
                            "group" : "ENEMY",
                            "spellsPower": [1, 1, 1, 1]
                        },
                        "forestElf" : {
                            "sprite" : "forestElf",
                            "maxMana" : 60,
                            "maxHealth" : 120, 
                            "manaRegeneration" : 1,
                            "spells" : { "poisonedLeaf" : 1 },
                            "AI" : "simple",
                            "group" : "ENEMY",
                            "spellsPower": [1, 1, 1, 1]
                        },
                        "guide" : {
                            "sprite" : "guide",
                            "maxMana" : 200,
                            "maxHealth" : 180, 
                            "manaRegeneration" : 2,
                            "spells" : { "poisonedLeaf" : 1 },
                            "AI" : "followPoint",
                            "group" : "ENEMY",
                            "spellsPower": [1, 1, 1, 1]
                        }
                      };
    // items
    this.items = {
        40: {
            "name" : "gold",
            "defaultTile": 11,
            "emptyTile" : EMPTY_TILE,
            "collisionWithSprite" : function(character) { character.gold++; }
        },
        41: {
            "name" : "potion",
            "defaultTile": 35,
            "emptyTile": EMPTY_TILE,
            "collisionWithSprite" : function(character) { character.potions++; }
        },
        42: {
            "name" : "magicBall",
            "defaultTile": 95,
            "emptyTile": 107,
            "collisionWithSprite" : function(character) { game.dialogManager.dialog(game.data.magicBallDialog); }
        },
        43: {
            "name" : "chest1",
            "defaultTile": 47,
            "emptyTile": 59,
            "collisionWithSprite" : function(character) { character.gold += 5; }
        },
        44: {
            "name" : "chest2",
            "defaultTile": 71,
            "emptyTile": 83,
            "collisionWithSprite" : function(character) { character.gold += 4; character.potions += 1; }
        }
    }
    // goups relation
    this.groupRelation = {
        "PLAYER" : { 
            "ENEMY" : 1,
            "NEUTRAL" : 0
        },
        "ENEMY" : {
            "PLAYER" : 1,
            "NEUTRAL" : 0
        },
        "NEUTRAL" : {
            "PLAYER" : 1,
            "ENEMY" : 0
        }        
    }
    this.characterByID = ["player1", "player2", "player3", "darkWizard", "nightWizard", "death", "devil", "bloodElf", "warriorElf", "forestElf", "fireWizard", "guide"];
    /*
    Levels description:
    {
        name : {
            map: - string containing map code
            triggers: [{
                type: single/multiple/constant 
                action: function which is called when trigger is trigged
                interval: when triggers type is multiple its describe time interval between function calls
            }],
            init: function called when level is selected
            update: function called each frame
        }
    }
    */
    this.levels = { "introduction" : {  "map" : "60 60 3 4 **************************************B54****MM4********44)6**************4*4*****A***N******(((****(((((((((((((((((((((()(5((((((((*******((((((((((((((((((4)(544(((((*(((((((((((((((((((((((444444)(54((((((*((((((((((((((((((((444444444)(544*(((((((((((((4444444A4AAAq(}44444*((44444444444AA)(((((((}AAAA444*(4444444444444444A4444q(( (((((((((((((544****4444@4444444444Aq(}44)(eM4MMMMMMMY(eMMM44N444AA44A4444A444q((((}AA¬4444444)(5444M44)((5)(5X4)(54)(((((((((54)(54444MM44M444M44MMMMMMMMM4444)(544444444A4444q(}444444444AA44AA444A4q(}44A44q(((}A444AA44q((}4((54444444)( (((5)(5)((((((5d)((5)((((5(e444444AA444444)(5MMM44M4)(eMMMM444MM4MMMM4(5444Aq((}44444444)(54444)(544(5444q(((((}4444AAAA¬44)(5444M444)(((((((544)(((((544)(5444444AA4A44MMMMMMM4444MMMMM4444q(}444A4A4q((}4Z444444444444444q(((}4AA)( ( ((((5***444)(((((54)((5M4M4MMMM4****4Y(eMM444MM4444444*****4)(544444)(5444A444A444444444AAq(5A4444444444q(}44Aq(}4444AA444Aq((((54q(}A44444L44444A44)(((})((((}44AA)((544)(((eY(}q((((}444AAA44A444q(}A)(((( (((((5)((5MM4444MMM4)((((((((54)(((5)(544)((((5MMMM4MMMMM44MM444444444MMMMMMMM44MMM4)(544)(eMM444444444444)(544)(544444)(544)(544444A44)(544)(54444444444444444444Aq(}44¬444)(544A4444AA4AA444AAA444AA444q((((}q(544)(}444q(}A444444)(( ((54)(((54)((54)((((((((544)((}44q((((}A4444AA4MM4MM4|4Y(e44MM44MMMMMMMM44)(((}q(((((((}444Aq((5p4444444)(5444)(((((((((((((54)(((e44444)(54AAAAAAAAAAA44MMMMMMMMMMM44MMM444)(5)((((((((((((544444444444)(}q(eMMMMMMMMY(54)((((5)(54MMMM4)(******Z*********************************************************************************************(-(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((-(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((-[((((((,C[(((((((((((((((((((((((((((((((((((((((((((((((((-([(((gC8((8[((((((((((g£££[((((((((((((((((((((((((((((((((-*(£££OOOO:OO£££££[((((¯(((¯(((((g[((((((((((((((((((((((((((+(((((((((((((((¯((((¯(((¯(((gC((C[((((((((((((((((((((((((¯((((((((((((((((s££££(((s£££OOOO.O-(((((((((((((((((((((((¯(((((((((((((((((((((((((((((((((((-(((((((((((((((((((((((¯((((((((((((((((((((((((((((((((((-((((((((((((gC8(((((¯((g([((((((((((((((((((((((((-(((((((((g(((C[(((s££OOO((((g-[£OOOOO7(((((((((((((g(-(C£(¯(((((gCCCC((-((((((¯((((((gCC(((((((-7((((g[((((¯(((((gCC((((((((((-([((g(([((((((((¯(((((gCCCCCC(((((((((((((-((CC(((([((((((((((¯(((((gCCCCCCCCCC(((((((((((((((((((.-(-(((((((((((((g££(((((g(((((((((((((((((((((((((((OOO(((-((((O((((((((¯((((((((gC(((((((((((((((((((((((((OO(((sO(-(OO((((((((((¯((((((((+(((((((((O(((O((((:((((((((((((((+-7(((((((((((((¯((((((((+((OOOOOO(sO(sOOOOOOOOO(g[(((((g(-([((((((((((gC7((((((((+(7(((((((((((((((((((((((g(([(((g((-((C[(gCCCCCC((7((((((((+(([(((((((((((((((((((gCC((((CCC(((-((((C(((((((((7((((((((+((7((((((((gCC[(((((gC(((((((((((-(-((((((((O(((F(7((((((((+(((£((((gCC(((([(((g(((((((O(OO((-(((OOOOOO(sOOOO((((((((+(((((((+(((((((CCC((((((O(((+(-((((((((((((((((((((((((+(7((((gC((((((((((((((((7((((((+(-((((((((((((g[((((((((((+O((((+(((((((((((((((((([(((((+(-7((((((gCCCCC(([(((((((((¯((((((sO(((((((OOO((((((O((((g((-([((((g((((((((([((((((((¯((((((((sOOO(((((sOOOO(((((g(((-(([((g(((((((((.7((((((((+,8((((((((((s(((((((((((((((s(((-:((CC(((((OO((((((((((((+8([(((((((((((((((((((((((((((+(-(OOOOOO((O((sOO(((((((((sOFO£((((((((((((((((((((((((((+(-7((((((s((((((((((((((((((((((((((((((((((((((((((((((g((-7((g[((((((((((((((((((((((((((((gC[((gCC(C[((((gC[((gCC(((-7((+([(((((gCC[((((((((((((((gCCC(((CC(((((([((g((([(+(((((-(CC(((C[(gC((((C[(((((((((((g((((((((((((((((CC(((((C((((((-((((((((C(((((((([(((((((((g((((((:((((:(((((((((((OO((O(((-(((((.((O((((((((7((((((((g(-(.((OOOOOOOOOOOOOOOOO((s(s((((((((((7(sOOOO(((7((((((((+(-(((((((((((((((((((((((((((sOOOOOOOOO((((((+((7((((((((+(-(((((((((((((((((((((((((((((((((((((((gC[((+((7((((((((+(-(((((((((((((((((((((((((((((((((((((g(('CC(((7((((((((+(-7(((((gC[(((((((((((gCCCC[(gC(C[(gC[((g(((((((((7((((((((+(-([(((g((([(((((((((g((((((C(((((C(((CC((((((((((7((((((((+(-(([(g(((((C[((((gCC((((((((((-((O((((O((::((((((((((((((+(-(((C(((((((([((g(((((((((((((-((sOO(sOOOOOOO(7(((((((((+(-(((((((((((((CC(((((((OOOO(((-7(((((((((((((((s(((((((((+(-(.(((((:(O((((O((((((((((sO(-(CCCCCCCCCCC[((((((((((((((s(((+O((O(7(s(((+(OOO(((((((+-(((((((((((((C[(((((((((((((s(((s(s((s((s(((((((((((+-((((OOOOOOOO(((£((((((((((((((((((((((((((((((((((((((((((+-(((7((((((((+((((((((((((((((((((((((((((((((((((((((((((sOOOO((((((((s7((((((((((((((((((,[(((((((((((,[((((g[((((((((((((((((((((¯(((((((((((((((((g8([(((((((((g8([(((+7((((((C((((((g[(((((¯((((((((((((((((g(((([(((((((g(((7(gC(([(gC8CC[(((((+(C8[((¯((((((((((((-£££OFOO:O£££££££OOFOO,OO:OO£O.O:OO£££££OOOOO££((((((((((((-(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((-(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((-(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((-(((((((((((((((((((((((((((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))*())))))((()))))))))))))))))))))))))))))))))))))))))))))))))*(()))((((((())))))))))((((())))))))))))))))))))))))))))))))*(+(Z=((((((([((())))))()))()))))(())))))))))))))))))))))))))))))))))))))))))))))))()))()))(((((()))))))))))))))))))))))))))))))))))))))))))((]()))(((((((^((*)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))*)))))))))))))))))))))))))))()))))))))))))))))))))))))))))))*)))))))))))))))((())))))))((())))))))))))))))))))))))))))))*))))))))))))))(((((()))(((P(S()))(((((((((((((((((((((())))*))))(((((((()(Q(R((()))))))))))))(((((((((((((((((())))))))*)))))))((((()))))))()))))((((((((((((((((((((((()))))))))))*))))))))))(((((()))()))))(((((((((((((((((((())))))))))))))*)))))))))))))))))))()))))((((((((((((()))))))))))))))))))))*)))))))))))))))))))()))))(())))))))))))))))))))))))))()((((*())))))))))))))))))()))))())))))))))))))))))))))))(()(((Q((*(*(((Q))))))))))(((())))))))))))))))))))))))())))()))))))))))*))))))))))))))()))))))))))))))))))))))))(((()))))))))))))))*))))))))))))))))))))))))))(())())))()))((Q(((((()))))))))))*)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))*)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))*))))))))))))))))))))))))))))))))))))))))))))))))))()))))))(*())))))))))(())))))))))(())))))))))))))))))))))()(Q())())*(*P(()))(())(Q(()))))))))()))))))))))))))))))))))()))))))))*)))))))))))))))))))))))))()))))))))))(())))))))))()))))))))*)))))))))))))))))))))))))()))))))))((((()))))))))))))))))))*))))))))))))))))))))))))))))))))))((S(Q(())))((((()))))))))*)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))*)))))))))))))(())))))))))())))))))))))))))))))))))))))))))(*()))))))()()(QQ()))))))))((()))))))))))))))))))))))))))))P(*(()))(())))))))))))))))))(((()))))))))))))))))))))))))))))*))))))))))))))))))))))))))(Q(T())))))))))))))))))))))))))))*)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))*)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))*))))))))))))))))))))))))))))))))))()))))()))))))))))))))(((*)))()))))))))))))))))))))))))))))((())(((())))))(())))((())*))(((()))))))))))))))))))))))()))((Q()((Q(())(())))))))))))*(((Q((()))((())())))))))))))*Q(()))))))))))))))))))))))))))))))))))))))))))())))))))))))*))))))))))))))))))))))))))))))))))))))))))))))())))))))))))*))))))))))))))))))))))))))))))))))))))))))))))())))))))))))*))))))))))))))))))))))))))))))))))))))))))))))())))))))))))*))))))))))))))))))))))))))))))))))))))))))())))))))))))))))*))))))))))))))))))))))))))))))))))))))))(((())())))))))))))*))))))()))))))))))))(()(()))(*()))(()))(((S(((())))))))))))*())))(((())))))))))))))))))))*)))))))))))))))))))))))))))))*(())((((((())))))(())))))))))*)))))))))))))))))))))))))))))*(((((S((Q((()))((()))))))))))*)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))*))(((((((((((()))))))))))))))))))))))))))))))))))))))))))))*))())))))))))()))))))))))))))))))))))))))))))))))))))))))))*((())))))))))()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))())))))))))))))))))(()))))))))))(())))(())))))))))))))))))))()))))))))))))))))(((()))))))))(((()))(()))))))))))))(()))))())))))))))))))))(((((()))))))((((()((((()(((((()))))((((())())))))))))))*(((((;(((((((((((((;((((((((((((((((((((R_((((())))))))))))*)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))*)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))`))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))",
                                        
                                        
                                        "triggers" : [
                                            {
                                                "type" : "single",
                                                "action" : function() {
                                                    game.dialogManager.dialog([
                                                        {
                                                            "icon_x": 64, "icon_y" : 64,
                                                            "message" : "Witaj. Miło, że chcesz uratować księżniczkę, która została porwana i uwięziona gdzieś w podziemiach. Zapoznam Cię z podstawowymi regułami, dzięki którym przetrwasz w tych warunkach. Za mną!"
                                                        },
                                                        {
                                                            "icon_x" : (game.player.id*64), "icon_y" : 0,
                                                           "message" : "Ruszajmy!",
                                                            "result" : function() {
                                                                game.map.resources["guide"].points = [{"x" : 16, "y" : 5}];
                                                            }
                                                        }
                                                    ]);
                                                }
                                            },
                                            { // kopanie
                                                "type" : "single",
                                                "action" : function() {
                                                    game.dialogManager.dialog([
                                                        {
                                                            "icon_x": 64, "icon_y" : 64,
                                                            "message" : "Podziemny świat składa się z wielu rodzajów skał. Niektóre są niezniszczalne, a niektóre można zniszczyć używając specialnego zaklęcia."
                                                        },
                                                        {
                                                            "icon_x": 64, "icon_y" : 64,
                                                            "message" : "Skały, które znajdują się przed Tobą można zniszczyć. Aby rzucić odpowiednie zaklęcie ustaw się w w kierunku skały, wciśnij lewy przycisk myszy i wykonaj ruch w prawo a potem w lewo."
                                                        },
                                                        {
                                                            "icon_x" : (game.player.id*64), "icon_y" : 0,
                                                            "message" : "Dobra, spróbuję.",
                                                            "result" : function() {
                                                                game.map.resources["guide"].points = [{"x" : 21, "y" : 7}];
                                                            }
                                                        }
                                                    ]);
                                                }
                                            },
                                            { // BUG, third trigger is broken
                                                
                                            },
                                            { // drabina
                                                "type" : "single",
                                                "action" : function() {
                                                    game.dialogManager.dialog([
                                                        {
                                                            "icon_x": 64, "icon_y" : 64,
                                                            "message" : "Kopiąc w podziemiach będziesz potrzebował drabin. Spadek z wysokości może negatywnie wpłynąć na Twoje życie."
                                                        },
                                                        {
                                                            "icon_x": 64, "icon_y" : 64,
                                                            "message" : "Aby wyczarować drabinę ustaw się w w kierunku, gdzie chcesz drabinę, wciśnij lewy przycisk myszy i wykonaj ruch do góry i na dół."
                                                        },
                                                        {
                                                            "icon_x" : (game.player.id*64), "icon_y" : 0,
                                                            "message" : "Zobaczymy co mi wyjdzie.",
                                                            "result" : function() {
                                                                game.map.resources["guide"].points = [{"x" : 28, "y" : 4}, {"x" : 34, "y" : 7}];
                                                            }
                                                        }
                                                    ]);
                                                }
                                            },
                                            { // kopalnia
                                                "type" : "single",
                                                "action" : function() {
                                                    game.dialogManager.dialog([
                                                        {
                                                            "icon_x": 64, "icon_y" : 64,
                                                            "message" : "Znasz już podstawy teraz pora byś przećwiczył te zdolności na opuszczonej kopalni. Znajdziesz tam dużo skarbów, które mogą Ci się przydać."
                                                        },
                                                        {
                                                            "icon_x": 64, "icon_y" : 64,
                                                            "message" : "Pamiętaj, że każde zaklęcie pozbawia Cię magicznej mocy. Zdolności magiczne regenerują się samoistnie z czasem. Jednak jeśli nie chcesz czekać możesz użyć magicznej mikstury. (Klawisz Q)"
                                                        },
                                                        {
                                                            "icon_x": 64, "icon_y" : 64,
                                                            "message" : "Zbieraj złoto. Na swojej drodze możesz spotkać postacie, z którymi będziesz mógł handlować za ten cenny surowiec."
                                                        },
                                                        {
                                                            "icon_x" : (game.player.id*64), "icon_y" : 0,
                                                            "message" : "Dobra, zchodzę na dół.",
                                                            "result" : function() {}
                                                        }
                                                    ]);
                                                }
                                            },
                                            { // przeciwnik i kula
                                                "type" : "single",
                                                "action" : function() {
                                                    game.dialogManager.dialog([
                                                        {
                                                            "icon_x": 64, "icon_y" : 64,
                                                            "message" : "Znasz już podstawy teraz pora byś przećwiczył te zdolności na opuszczonej kopalni. Znajdziesz tam dużo skarbów, które mogą Ci się przydać."
                                                        },
                                                        {
                                                            "icon_x": 64, "icon_y" : 64,
                                                            "message" : "Pamiętaj, że każde zaklęcie pozbawia Cię magicznej mocy. Zdolności magiczne regenerują się samoistnie z czasem. Jednak jeśli nie chcesz czekać możesz użyć magicznej mikstury. (Klawisz Q)"
                                                        },
                                                        {
                                                            "icon_x": 64, "icon_y" : 64,
                                                            "message" : "Zbieraj złoto. Na swojej drodze możesz spotkać postacie, z którymi będziesz mógł handlować za ten cenny surowiec."
                                                        },
                                                        {
                                                            "icon_x" : (game.player.id*64), "icon_y" : 0,
                                                            "message" : "Dobra, zchodzę na dół.",
                                                            "result" : function() {}
                                                        }
                                                    ]);
                                                }
                                            }
                                            
                                        ],
                                        "init" : function() {
                                            game.map.resources["guide"] = game.characters[0];
                                            game.dialogManager.dialog( [
                                                {
                                                    "icon_x": 0, "icon_y" : 256,
                                                    "message" : "Welcome wizard! Please choose your character, which you will lead through an underground world full of secrets and mysteries."
                                                },
                                                {
                                                    "icon_x": 0, "icon_y" : 0,
                                                    "message" : "Name1 \n Health : 100, Mana: 120 \nspecializes in magic associated with the elements of wind and ice.",
                                                    "result" : function () { game.player.setCharacter("player1"); }
                                                },
                                                {
                                                    "icon_x": 64, "icon_y" : 0,
                                                    "message" : "Name2 \n Health : 120, Mana: 100 \nspecializes in magic associated with fire",
                                                    "result" : function () { game.player.setCharacter("player2"); }
                                                },
                                                {
                                                    "icon_x": 128, "icon_y" : 0,
                                                    "message" : "Name3 \n Health : 100, Mana: 100 Faster mana regeneration \n specializes in magic associated with nature.",
                                                    "result" : function () { game.player.setCharacter("player3"); }
                                                }
                                            ])
                                        },
                                        "update" : function() {
                                            game.map.resources["guide"].AI.update.call(game.map.resources["guide"]);
                                        }
                                     }
                  };
    this.gameMenuDialog = [
        {
            "icon_x": 64, "icon_y": 256,
            "message": "Powrot do gry",
            "result" : function() { game.dialogManager.finish(); }
        },
        {
            "icon_x": 128, "icon_y": 256,
            "message": "Zapisz gre",
            "result": function() {
                var slots = new Array();
                slots[0] = { "icon_x" : 0, "icon_y" : 0, "message" : "Choose save slot:"}
                for(var i = 1 ; i <= 3 ; i++)
                    if(typeof localStorage[i] != "undefined") {
                        console.log(localStorage);
                        console.log(i);
                        var save = localStorage.getObject(i);
                        console.log(save);
                        slots[i] = { "icon_x" : 0, "icon_y" : 0, "message" : (save.map.name + " \n " + save.date + " \n Health: " + 32 + " Gold: 5"), "result" : function(){}}
                    } else {
                        slots[i] = { "slot" : i, "icon_x" : 0, "icon_y" : 0, "message" : "empty slot", "result" : function(){
                            var save = { "map" : game.map};
                            save.date = getFullDate();
                            localStorage.setObject(this.slot, save);
                        } }
                    }
                slots[4] = { "icon_x" : 0, "icon_y" : 0, "message" : "Back", "result" : function() { game.dialogManager.dialog(game.data.gameMenuDialog)}}
                game.dialogManager.dialog(slots);
            }
        },
        {
            "icon_y": 192, "icon_y": 256,
            "message": "Wczytaj gre",
            "result": function() {}
        },
        {
            "icon_x": 0, "icon_y": 256,
            "message": "Lista czarow",
            "result": function() { game.state = game.spellList; }
        },
        {
            "icon_x": 320, "icon_y": 256,
            "message": "Wyjscie",
            "result": function() {}
        }
    ];
    this.magicBallDialog = [
        {
            "icon_x": 128, "icon_y": 192,
            "message": "Wybierz czego oczekujesz od magicznej kuli!"
        },
        {
            "icon_x": 192, "icon_y": 192,
            "message": "Zwiększenie witalności",
            "result": function() { game.player.maxHealth += 25; }
        },
        {
            "icon_x": 256, "icon_y": 192,
            "message": "Zwiększenie zdolności magicznych",
            "result": function() { game.player.maxMana += 20; }
        },
        {
            "icon_x": 320, "icon_y": 192,
            "message": "Przyśpieszenie regeneracji many",
            "result": function() { game.player.manaRegenerated += 0.2; }
        }
    ]
}


      