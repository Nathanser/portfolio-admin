function validateForm(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var errorMessage = document.getElementById("error-msg");

    if ((username === "nserror" && password === "portfolio") || (username === "" && password === "")) {      // ajouter un autre utilisateur

        // Ouvrir une nouvelle page dans une nouvelle fenêtre ou un nouvel onglet
        window.open("portfolio/portfolio.html", "_blank");

        // Fermer la page actuelle
        window.close();

    } else {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Identifiants incorrects!";
    }
}


var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};

// Fonction de gestionnaire d'événement pour le clic du bouton de déconnexion
function logout() {
    // Remplacer l'URL de la page actuelle par l'URL de la nouvelle page
    history.replaceState(null, '', 'index-login.html');

    // Ouvrir une nouvelle page dans une nouvelle fenêtre ou un nouvel onglet
    window.open('index-login.html', '_blank');

    // Fermer la page actuelle
    window.close();
}


// Ajouter un écouteur d'événements au bouton de déconnexion
var logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", logout);
