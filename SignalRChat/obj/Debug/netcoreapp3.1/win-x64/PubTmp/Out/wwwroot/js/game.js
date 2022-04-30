let img;
var onder1 = ["Kerk-", "", "West-", "", "Goes", "Goesse-", "", "Oost-", "Biezelingse-"];
var onder2 = ["plein", "", "straat", "", "Goes", "straatweg", "", "straat", "straat"];
var onderkleur = [1, 0, 1, 0, 0, 1, 0, 1, 1];
var links1 = ["Stations-", "", "Coxstraat", "Gistellis-", "Kruiningen", "Maurits-", "", "Elsstar-", "Bruelis-"]
var links2 = ["straat", "", "", "straat", "", "straat", "", "straat", "straat"]
var linkerkleur = [1, 0, 1, 1, 0, 1, 0, 1, 1];
var boven1 = ["Sterappel-", "", "Opalstraat", "Maalstede", "Middelburg", "Klaproos-", "Duizend-", "", "Vroolandse-"]
var boven2 = ["straat"    , "", ""          , ""         , ""          , "straat"   , "blad", ""    , "weg"]
var bovenkleur = [1, 0, 1, 1, 0, 0, 0, 0, 0];
var rechts1 = ["Weegbree", "Haviks-", "", "Fluite-", "Kapelle-", "", "Pastinaak", "", "Ambachtshe"]
var rechts2 = ["", "kruid", "", "kruid", "Biezelinge", "", "", "", "ren wegeling"]
var rechtskleur = [1,1, 0, 1, 0, 0, 1, 0, 1];
var pion1pos = 0;
var pion2pos = 0;
var clickX = 0;
var clickY = 0;
var geklikt = -1;
var afbeeldingsGrote = 950;
var normaalhok = afbeeldingsGrote / 100 * 8.0178;
var vierkanthok = afbeeldingsGrote / 100 * 13.9198;
var pionbreedte = afbeeldingsGrote / 100 * 6;
var pionzak = afbeeldingsGrote / 100 * 4;
var balkkleuren = ['#ffffff', '#1f4e79', '#ffffff', '#1f4e79', '#ffffff', '#ffffff', '#00b0f0', '#ffffff', '#00b0f0', '#00b0f0', '#ffffff', '#7030a0', '#ffffff', '#7030a0', '#7030a0', '#ffffff', '#ffc000', '#ffffff', '#ffc000', '#ffc000', '#ffffff', '#ff0000', '#ffffff', '#ff0000', '#ff0000', '#ffffff', '#ffff00', '#ffff00', '#ffffff', '#ffff00', '#ffffff'];


class Kaart {
    constructor(x, y, width, height, tekst1, tekst2,kleur) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.kleur = kleur;
        this.tekst1 = tekst1;
        this.tekst2 = tekst2;
    }
}

var kaarten = [];
//start kaart
var thisKaart = new Kaart(vierkanthok + (9 * normaalhok), vierkanthok + (9 * normaalhok), vierkanthok, vierkanthok, "Start", "", 1);
kaarten.push(thisKaart);
//kaarten aan de onderkant
for (a = 0; a <= 8; a++) {
    var thisKaart = new Kaart(vierkanthok + ((8 - a) * normaalhok), vierkanthok + (9 * normaalhok), normaalhok, vierkanthok, onder1[a], onder2[a], onderkleur[a]);
    kaarten.push(thisKaart);
}

//Gevangenis
var thisKaart = new Kaart(1, vierkanthok + (9 * normaalhok), vierkanthok, vierkanthok, "Gevangenis", "", 1);
kaarten.push(thisKaart);
for (a = 0; a <= 8; a++) {
    var thisKaart = new Kaart(1, vierkanthok + ((8 - a) * normaalhok), vierkanthok, normaalhok, links1[a], links2[a], linkerkleur[a]);
    kaarten.push(thisKaart);
}

//Vrij parkeren
var thisKaart = new Kaart(1, 1, vierkanthok, vierkanthok, "Vrij", "parkeren", 1);
kaarten.push(thisKaart);
for (a = 0; a <= 8; a++) {
    var thisKaart = new Kaart(vierkanthok + ((a) * normaalhok), 1, normaalhok, vierkanthok, boven1[a], boven2[a], bovenkleur[a]);
    kaarten.push(thisKaart);
}
//Naar de gevangenis
var thisKaart = new Kaart(vierkanthok + (9 * normaalhok), 1, vierkanthok, vierkanthok, "Naar de", "gevangenis", 1);
kaarten.push(thisKaart);
for (a = 0; a <= 8; a++) {
    var thisKaart = new Kaart(vierkanthok + (9 * normaalhok), vierkanthok + ((a) * normaalhok), vierkanthok, normaalhok, rechts1[a], rechts2[a], rechtskleur[a]);
    kaarten.push(thisKaart);
}

geklikt = kaarten[1].x;

setTimeout(function () { pion1plaatser(); } , 1000);
function pion1plaatser() {
    pion1pos = pion1pos + 1;
    pion2pos = pion2pos + 1;
    if (pion1pos >= 40) {
        pion1pos = 0;
    }
    if (pion2pos >= 40) {
        pion2pos = 0;
    }
    setTimeout(function () { pion1plaatser(); }, 1000);
}

function setup() {
    let myCanvas = createCanvas(1000, 1000);
    myCanvas.parent('gameContainer');
    img = loadImage('/images/bord2.svg'); // Load the image
    pion1 = loadImage('/images/Pion1.svg'); // Load the image
    pion2 = loadImage('/images/Pion2.svg'); // Load the image
}

function mousePressed() {
    clickX = mouseX;
    clickY = mouseY;
    geklikt = findKaartButton(mouseX, mouseY);
}

function findKaartButton(x, y) {
    for (a = 0; a < 40; a++) {
        if (x > kaarten[a].x && x < kaarten[a].x + kaarten[a].width && y > kaarten[a].y && y < kaarten[a].y + kaarten[a].height) {
            return a;
        }
    }
    return -1;
}

function draw() {
    // Displays the image at its actual size at point (0,0)
    image(img, 0, 0, afbeeldingsGrote, afbeeldingsGrote);
    //onderste regel straatnamen
    push();
    textStyle(BOLD);
    textSize(12);
    translate(vierkanthok + (9 * normaalhok) - (0.5 * normaalhok), vierkanthok + (9 * normaalhok)+12);
    //rotate(PI);
    textAlign(CENTER);
    for (i = 0; i < 9; i++) {
        if (onderkleur[i] == 1) {
            fill(255, 255, 255);
        }
        else {
            fill(0, 0, 0);
        }
        text(onder1[i], 0, 0);
        text(onder2[i], 0, 15);
        translate(-normaalhok, 0);
    }
    pop();
    //einde onderste regel straatnamen
    //linker regel straatnamen
    push();
    textStyle(BOLD);
    textSize(12);
    translate(vierkanthok - 12, vierkanthok + (9 * normaalhok) - (0.5 * normaalhok));
    rotate(PI/2);
    textAlign(CENTER);
    for (i = 0; i < 9; i++) {
        if (linkerkleur[i] == 1) {
            fill(255, 255, 255);
        }
        else {
            fill(0, 0, 0);
        }
        text(links1[i], 0, 0);
        text(links2[i], 0, 15);
        translate(-normaalhok, 0);
    }
    pop();
    //einde Linker regel straatnamen
    //bovenregel straatnamen
    push();
    textStyle(BOLD);
    textSize(12);
    translate(vierkanthok+(0.5 * normaalhok), vierkanthok-12);
    rotate(PI);
    textAlign(CENTER);
    for (i = 0; i < 9; i++) {
        if (bovenkleur[i] == 1) {
            fill(255, 255, 255);
        }
        else {
            fill(0, 0, 0);
        }
        text(boven1[i], 0, 0);
        text(boven2[i], 0, 15);
        translate(-normaalhok, 0);
    }
    pop();
    //einde bovenregel straatnamen
    //rechtsregel straatnamen
    push();
    textStyle(BOLD);
    textSize(12);
    translate(vierkanthok + (9 * normaalhok)+12, vierkanthok + (0.5 * normaalhok));
    rotate(PI*1.5);
    textAlign(CENTER);
    for (i = 0; i < 9; i++) {
        if (rechtskleur[i] == 1) {
            fill(255, 255, 255);
        }
        else {
            fill(0, 0, 0);
        }
        text(rechts1[i], 0, 0);
        text(rechts2[i], 0, 15);
        translate(-normaalhok, 0);
    }
    pop();
    push();
    //rechtsbovenregel straatnamen
    if ((pion1pos >= 0) && (pion1pos <= 10)) {
        image(pion1, vierkanthok + ((9-pion1pos) * normaalhok) + 2, vierkanthok + (9 * normaalhok), pionbreedte, pionbreedte);
    }
    if ((pion1pos >= 11) && (pion1pos <= 20)) {
        image(pion1, vierkanthok - normaalhok-30, vierkanthok -30 +  ((pion1pos-((pion1pos-10)*2)) * normaalhok), pionbreedte, pionbreedte);
    }
    if ((pion1pos >= 21) && (pion1pos <= 30)) {
        image(pion1, vierkanthok + (normaalhok * (pion1pos-21)) , vierkanthok - 90, pionbreedte, pionbreedte);
    }
    if ((pion1pos >= 31) && (pion1pos <= 40)) {
        image(pion1, vierkanthok + (normaalhok * 9)+40, vierkanthok + (normaalhok * (pion1pos-31)), pionbreedte, pionbreedte);
    }

    if ((pion2pos >= 0) && (pion2pos <= 10)) {
        image(pion2, vierkanthok + ((9 - pion2pos) * normaalhok) + 2, vierkanthok + (9 * normaalhok) + pionzak, pionbreedte, pionbreedte);
    }
    if ((pion2pos >= 11) && (pion2pos <= 20)) {
        image(pion2, vierkanthok - normaalhok - 30, vierkanthok - 30 + ((pion2pos - ((pion2pos - 10) * 2)) * normaalhok) - pionzak, pionbreedte, pionbreedte);
    }
    if ((pion2pos >= 21) && (pion2pos <= 30)) {
        image(pion2, vierkanthok + (normaalhok * (pion2pos - 21)), vierkanthok - 90, pionbreedte, pionbreedte);
    }
    if ((pion2pos >= 31) && (pion2pos <= 40)) {
        image(pion2, vierkanthok + (normaalhok * 9) + 40, vierkanthok + (normaalhok * (pion2pos - 31)), pionbreedte, pionbreedte);
    }
    pop();
    push();
    translate(200, 200);
    textStyle(BOLD);
    textSize(12);
    text(clickX, 0, 0);
    text(clickY, 0, 20);
    text(geklikt, 0, 40);
    pop();

    if (geklikt > 0 && geklikt <= 39) {
        push();
        //er is dus op een kaart geklikt
        fill('#674523');
        rect((afbeeldingsGrote / 2) - 150, (afbeeldingsGrote / 2) - 225, 300, 450);
        pop();
    }


    //image(pion2, vierkanthok + (8 * normaalhok) + 6, vierkanthok + (9 * normaalhok) + pionzak + 25, pionbreedte, pionbreedte);
    // Displays the image at point (0, height/2) at half size
}
