// Інструкція з використання
console.log("Інструкція до функції triangle(val1, type1, val2, type2):");
console.log("Можливі типи: 'leg' (катет), 'hypotenuse' (гіпотенуза), 'adjacent angle' (прилеглий кут), 'opposite angle' (протилежний кут), 'angle' (кут при відомій гіпотенузі).");
console.log("Приклад: triangle(4, 'leg', 8, 'hypotenuse');");

function triangle(val1, type1, val2, type2) {
    const TYPES = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    

    if (!TYPES.includes(type1) || !TYPES.includes(type2)) {
        console.log("Помилка: Неправильний тип аргумента. Перечитайте інструкцію.");
        return "failed";
    }

    if (val1 <= 0 || val2 <= 0) {
        console.log("Помилка: Значення повинні бути додатними.");
        return "failed";
    }

    let a, b, c, alpha, beta;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const toDeg = (rad) => (rad * 180) / Math.PI;

    try {
      
        let params = {};
        params[type1] = val1;
        params[type2] = val2;

        if (type1 === "leg" && type2 === "leg") {
     
            a = val1;
            b = val2;
            c = Math.sqrt(a * a + b * b);
            alpha = toDeg(Math.atan(a / b));
            beta = 90 - alpha;
        } 
 
        else if (params["leg"] && params["hypotenuse"]) {
            a = params["leg"];
            c = params["hypotenuse"];
            if (a >= c) {
                console.log("Помилка: Катет не може бути більшим або рівним гіпотенузі.");
                return "failed";
            }
            b = Math.sqrt(c * c - a * a);
            alpha = toDeg(Math.asin(a / c));
            beta = 90 - alpha;
        }

        else if (params["leg"] && params["adjacent angle"]) {
            a = params["leg"];
            beta = params["adjacent angle"];
            if (beta >= 90) return "failed";
            c = a / Math.cos(toRad(beta));
            b = Math.sqrt(c * c - a * a);
            alpha = 90 - beta;
        }

        else if (params["leg"] && params["opposite angle"]) {
            a = params["leg"];
            alpha = params["opposite angle"];
            if (alpha >= 90) return "failed";
            c = a / Math.sin(toRad(alpha));
            b = Math.sqrt(c * c - a * a);
            beta = 90 - alpha;
        }

        else if (params["hypotenuse"] && params["angle"]) {
            c = params["hypotenuse"];
            alpha = params["angle"];
            if (alpha >= 90) return "failed";
            a = c * Math.sin(toRad(alpha));
            b = c * Math.cos(toRad(alpha));
            beta = 90 - alpha;
        }

        else {
            console.log("Помилка: Несумісна пара типів. Перечитайте інструкцію.");
            return "failed";
        }

        if (alpha <= 0 || alpha >= 90 || beta <= 0 || beta >= 90) {
            console.log("Помилка: Кути трикутника мають бути гострими.");
            return "failed";
        }

        console.log(`a = ${+a.toFixed(2)}`);
        console.log(`b = ${+b.toFixed(2)}`);
        console.log(`c = ${+c.toFixed(2)}`);
        console.log(`alpha = ${+alpha.toFixed(2)}°`);
        console.log(`beta = ${+beta.toFixed(2)}°`);

        return "success";

    } catch (e) {
        console.log("Сталася помилка при обчисленні. Перевірте вхідні дані.");
        return "failed";
    }
}