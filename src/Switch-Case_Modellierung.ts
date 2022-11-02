// Ihr modellierter Ansatz mit Inline-Objekt anstelle des Switch-Case
abstract class Config {}
class ConfigEasy extends Config{}
class ConfigMedium  extends Config{}
class ConfigHard  extends Config{}
// ...
enum Difficulty {
    easy = 1,
    medium = 2,
    hard = 1,
}

// Wie auch immer eingelesene Nutzerparameter
const userConfig = {
    difficulty: Difficulty.easy,
    bitLenght: 5,
};

// Ersetzt ihr Switch Case mit einem Dictionary ...
const configTypes = {
    [Difficulty.easy]: ConfigEasy,
    [Difficulty.medium]: ConfigMedium,
    [Difficulty.hard]: ConfigHard,
};
// ... und einem generischen Aufruf anhand des difficulty-Parameters
const config = new configTypes[userConfig["difficulty"]]();

// Grundlegende Problematik:
// Falls Nutzer selbst Parameter generieren soll, wird dies auch Bestandteil der Aufgabenstellung.
// D.h. perspektivisch sollten auch hierfür Fehlerhinweise/Lösungshilfen etc. zur Verfügung stehen.
// Das heisst die Config-Subklassen müssten mehr tun als ihr Name suggeriert.

// Alternative Modellierung mit klareren Bezeichnern und Verantwortlichkeiten
// Ich hoffe ich verwirre Sie damit nicht, bei weiteren Fragen gerne in Teams / per Mail.

// Config die an RSA-Klasse übergeben wird
interface RSAConfig {
    p: number;
    q: number;
    // ...
}

// Parameter die der User setzt
interface UserConfig {
    difficulty: Difficulty;
    p?: number;
    q?: number;
    // ...
}

// Vorzugsweise alle Parameter per Konsole abfragen
// Bspw.:
// Frage 1: Schwierigkeitsgrad?
// Abhängig davon weitere Parameter abfragen
// ...
// + Feedback bei fehlerhafter Eingabe

// Klasse die sich um das Initialisieren der RSA-Konfiguration kümmert
class RSAConfigHandler {
    private RSAConfig: RSAConfig;

    // Lässt sich evtl. auch als Strategy mit Dependency-Injection im constructor implementieren (s. https://refactoring.guru/design-patterns/strategy/typescript/example)
    private difficultySetting = {
        [Difficulty.easy]: AutomaticParameterGenerator,
        [Difficulty.medium]: UserSetPQ,
        // ...
    };

    constructor(private userConfig: UserConfig) {
        const parameterSetter = new this.difficultySetting[userConfig.difficulty]();

        this.RSAConfig = {
            ...userConfig,
            ...parameterSetter.setParameters(),
        };
    }

    public getRSAConfig() {
        return this.RSAConfig;
    }
}

// Klasse die sich um das Generieren der für die RSA-Klasse fehlenden Parameter kümmert.
abstract class RSAParameterSetter {
    public setParameters() {
        return {} as RSAConfig;
    }
}
// Vollständiges / Teilweises Setzen der Parameter durch User / automatisch analog zu Ihren Easy/Medium/Hard-Config-Klassen
class UserSetPQ extends RSAParameterSetter {}
class AutomaticParameterGenerator extends RSAParameterSetter {}
// ...
