import { app } from './firebaseConfig.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

const db = getDatabase(app);
const form = document.getElementById('newsletterForm');
const submitedv = document.getElementById('submitedv');
const submitedx = document.getElementById('submitedx');
const loading = document.querySelector('.loading');

function attachEmailValidator(elements) {
    regula.custom({
        name: 'EmailValidate',
        validator: function () {
            if (this.value === '') return true;
            else return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
        }
    });

    for (var i = 0; i < elements.length; i++) {
        var o = $(elements[i]), v;
        o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
        v = o.parent().find(".form-validation");
        if (v.is(":last-child")) o.addClass("form-control-last-child");
    }

    elements.on('input change propertychange blur', function (e) {
        var $this = $(this), results;

        if (e.type !== "blur") if (!$this.parent().hasClass("has-error")) return;
        if ($this.parents('.rd-mailform').hasClass('success')) return;

        if ((results = $this.regula('validate')).length) {
            for (i = 0; i < results.length; i++) {
                $this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error");
            }
        } else {
            $this.siblings(".form-validation").text("").parent().removeClass("has-error")
        }
    }).regula('bind');

    regula.override({
        constraintType: regula.Constraint.Email,
        defaultMessage: "Este e-mail não é válido."
    });
}

function isEmailValidated(element) {
    var results = element.regula('validate');
    var $validation = element.siblings(".form-validation");

    if (results.length) {
        $validation.text(results[0].message).parent().addClass("has-error");
        return false;
    } else {
        $validation.text("").parent().removeClass("has-error");
        return true;
    }
}

$(document).ready(function() {
    attachEmailValidator($('#newsletter'));
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const emailElement = $('#newsletter');
    if (isEmailValidated(emailElement)) {
        const email = document.getElementById('newsletter').value;
        const now = new Date();

        const formattedTimestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

        const newContact = {
            email,
            data: formattedTimestamp
        };

        loading.classList.add("visible");

        try {
            const contactsRef = ref(db, 'Notícias');
            await push(contactsRef, newContact);
            setTimeout(function() {
                loading.classList.remove("visible");
                submitedv.classList.add("visible");
                setTimeout(function() {
                    submitedv.classList.remove("visible");
                }, 3000);
            }, 3000);
            form.reset();
        } catch (error) {
            setTimeout(function() {
                loading.classList.remove("visible");
                submitedx.classList.add("visible");
                setTimeout(function() {
                    submitedx.classList.remove("visible");
                }, 3000);
            }, 3000);
        }        
    }
});
