let img;
var onder1 = ["Kerk-", "", "West-", "", "Goes", "Goesse-", "", "Oost-", "Biezelingse-"];
var onder2 = ["plein", "", "straat", "", "", "straatweg", "", "straat", "straat"];
var onderkleur = [1, 0, 1, 0, 0, 1, 0, 1, 1];
var links1 = ["Stations-", "", "Coxstraat", "Gistellis-", "Kruiningen", "Maurits-", "", "Elsstar-", "Bruelis-"]
var links2 = ["straat", "", "", "straat", "", "straat", "", "straat", "straat"]
var linkerkleur = [1, 0, 1, 1, 0, 1, 0, 1, 1];
var boven1 = ["Sterappel-", "", "Opalstraat", "Maalstede", "Middelburg", "Klaproos-", "Duizend-", "", "Vroolandse-"]
var boven2 = ["straat"    , "", ""          , ""         , ""          , "straat"   , "blad", ""    , "weg"]
var bovenkleur = [1, 0, 1, 1, 0, 0, 0, 0, 0];
var rechts1 = ["Weegbree", "Haviks-", "", "Fluite-", "Kapelle-", "", "Pastinaak", "", "Ambachtshe"]
var rechts2 = ["", "kruid", "", "kruid", " Biezelinge", "", "", "", "ren wegeling"]
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
var balkkleuren = ['#ffffff', '#1f4e79', '#ffffff', '#1f4e79', '#ffffff', '#ffffff', '#00b0f0', '#ffffff', '#00b0f0', '#00b0f0',
                   '#ffffff', '#7030a0', '#ffffff', '#7030a0', '#7030a0', '#ffffff', '#ffc000', '#ffffff', '#ffc000', '#ffc000',
                   '#ffffff', '#ff0000', '#ffffff', '#ff0000', '#ff0000', '#ffffff', '#ffff00', '#ffff00', '#ffffff', '#ffff00',
    '#ffffff', '#00b050', '#00b050', '#ffffff', '#00b050', '#ffffff', '#ffffff', '#2e75b6', '#ffffff', '#2e75b6'];
var balknamen = ['start', 'Kerkplein', 'Algemeen fonds', 'Weststraat', 'Belasting', 'Station Goes', 'Goessestraatweg', 'Kans', 'Ooststraat', 'Biezelingsestraat',];


class Kaart {
    constructor(x, y, width, height, tekst1, tekst2,kleur,vollenaam) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.kleur = kleur;
        this.tekst1 = tekst1;
        this.tekst2 = tekst2;
        this.vollenaam = vollenaam;
        this.eigenaar = "";
        this.waarde = "";
        this.huisprijs = "";
    }
}

var kaarten = [];
//start kaart
var thisKaart = new Kaart(vierkanthok + (9 * normaalhok), vierkanthok + (9 * normaalhok), vierkanthok, vierkanthok, "Start", "", 0,"Start");
kaarten.push(thisKaart);
//kaarten aan de onderkant
for (a = 0; a <= 8; a++) {
    var vollenaam = onder1[a].replace("-","") + onder2[a];
    var thisKaart = new Kaart(vierkanthok + ((8 - a) * normaalhok), vierkanthok + (9 * normaalhok), normaalhok, vierkanthok, onder1[a], onder2[a], onderkleur[a],vollenaam);
    kaarten.push(thisKaart);
}

//Gevangenis
var thisKaart = new Kaart(1, vierkanthok + (9 * normaalhok), vierkanthok, vierkanthok, "Gevangenis", "", 0,"Gevangenis");
kaarten.push(thisKaart);
for (a = 0; a <= 8; a++) {
    var vollenaam = links1[a].replace("-", "") + links2[a];
    var thisKaart = new Kaart(1, vierkanthok + ((8 - a) * normaalhok), vierkanthok, normaalhok, links1[a], links2[a], linkerkleur[a],vollenaam);
    kaarten.push(thisKaart);
}

//Vrij parkeren
var thisKaart = new Kaart(1, 1, vierkanthok, vierkanthok, "Vrij", "parkeren", 0,"Vrij parkeren");
kaarten.push(thisKaart);
for (a = 0; a <= 8; a++) {
    var vollenaam = boven1[a].replace("-", "") + boven2[a];
    var thisKaart = new Kaart(vierkanthok + ((a) * normaalhok), 1, normaalhok, vierkanthok, boven1[a], boven2[a], bovenkleur[a],vollenaam);
    kaarten.push(thisKaart);
}
//Naar de gevangenis
var thisKaart = new Kaart(vierkanthok + (9 * normaalhok), 1, vierkanthok, vierkanthok, "Naar de", "gevangenis", 0, "Naar de gevangenis");
kaarten.push(thisKaart);
for (a = 0; a <= 8; a++) {
    var vollenaam = rechts1[a].replace("-", "") + rechts2[a];
    var thisKaart = new Kaart(vierkanthok + (9 * normaalhok), vierkanthok + ((a) * normaalhok), vierkanthok, normaalhok, rechts1[a], rechts2[a], rechtskleur[a],vollenaam);
    kaarten.push(thisKaart);
}

kaarten[0].vollenaam = "Start";
kaarten[2].vollenaam = "Algemeen fonds";
kaarten[4].vollenaam = "Belastingen";
kaarten[7].vollenaam = "Kans";
kaarten[10].vollenaam = "Gevangenis";
kaarten[12].vollenaam = "Electrisch";
kaarten[17].vollenaam = "Algemeen fonds";
kaarten[20].vollenaam = "Vrij parkeren";
kaarten[22].vollenaam = "Kans";
kaarten[28].vollenaam = "Water";
kaarten[30].vollenaam = "Naar de gevangenis";
kaarten[33].vollenaam = "Algemeen fonds";
kaarten[36].vollenaam = "Kans";
kaarten[38].vollenaam = "Belastingen";



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
            
            connection.invoke("getKaart", a).catch(function (err) {
                return console.error(err.toString());
            });
            return a;
        }
    }
    return -1;
}
connection.on("thisCard", function (id, eigenaar) {
    kaarten[id].eigenaar = eigenaar;
});

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

    if (geklikt >= 0 && geklikt <= 39) {
        push();
        //er is dus op een kaart geklikt
        fill('#ffffff');
        rect((afbeeldingsGrote / 2) - 160, (afbeeldingsGrote / 2) - 235, 320, 470);
        fill(balkkleuren[geklikt]);
        rect((afbeeldingsGrote / 2) - 150, (afbeeldingsGrote / 2) - 225, 300, 450,30,30,30,30);
        fill('#ffffff');
        rect((afbeeldingsGrote / 2) - 150, (afbeeldingsGrote / 2) - 140, 300, 365, 0, 0, 30, 30);
        textStyle(BOLD);
        if (kaarten[geklikt].kleur == "1") {
            fill(255, 255, 255);
        }
        else {
            fill(0,0,0);
        }
        
        textSize(28);
        textAlign(CENTER);
        text(kaarten[geklikt].vollenaam, (afbeeldingsGrote / 2) - 125, (afbeeldingsGrote / 2) - 210, 270, 70);
        textSize(14);
        fill(0, 0, 0);
        text("Eigenaar:", (afbeeldingsGrote / 2) - 125, (afbeeldingsGrote / 2) - 120, 80, 30);
        text(kaarten[geklikt].eigenaar, (afbeeldingsGrote / 2) - 40, (afbeeldingsGrote / 2) - 120, 150, 30);
        pop();
    }


    //image(pion2, vierkanthok + (8 * normaalhok) + 6, vierkanthok + (9 * normaalhok) + pionzak + 25, pionbreedte, pionbreedte);
    // Displays the image at point (0, height/2) at half size
}
