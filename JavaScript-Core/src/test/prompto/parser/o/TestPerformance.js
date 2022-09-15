import antlr4 from "antlr4";
import * as prompto from "../../../../main/prompto/index.js";

class OTestParser extends prompto.parser.OCleverParser {
    constructor(code) {
        super(code);
    }

    value(tree) {
        var builder = new prompto.parser.OPromptoBuilder(this);
        var walker = new antlr4.tree.ParseTreeWalker();
        walker.walk(builder, tree);
        return builder.getNodeValue(tree);
    }

    parse_declaration() {
        return this.value(this.declaration());
    }

}

const code = `
@WidgetProperties({details: RegistrationDetails, onNext: TextCallback, onDetails: DetailsCallback})
widget EnterCredentialsPhase extends ReactWidget {

    method getInitialState() {
        login = props.details.login is null ? "" : props.details.login;
        email = props.details.email is null ? "" : props.details.email;
        phone = props.details.phoneNumber is null ? "" : props.details.phoneNumber;
        return { subscriptionId: props.details.subscriptionId,
            login: login, loginFeedback: convertLoginResult("LOGIN_IS_MANDATORY"),
            email: email, emailFeedback: convertEmailResult("EMAIL_IS_MANDATORY"),
            phone: phone, phoneFeedback: convertPhoneResult("PHONE_IS_MANDATORY"),
            password1: "", password2: "", passwordFeedback: convertPasswordResult("PASSWORD_IS_MANDATORY")};
    }

    method componentDidMount() {
        checkValidLogin();
        checkValidEmail();
        checkValidPhone();
    }

    method render() {
        return <>
            <h3>Bienvenue sur Rentavie</h3>
            <h4>Votre numéro de souscription est&nbsp;{Formatter.formatSubscriptionId(props.details.subscriptionId)}</h4>
            { <RegistrationRewards subscriptionId={props.details.subscriptionId} />}
            <h3>Afin de sécuriser votre accés, nous allons maintenant créer votre compte Rentavie</h3>
            <Container>
                <Row>
                    <Col xs={3} />
                    <Col xs={6}>
                        <Form validated={true}>
                            <FormGroup>
                                <FormLabel>Votre identifiant</FormLabel>
                                <FormControl ref="login" required pattern="[a-zA-Z0-9!?~@#$&*+-=_].{6,}" placeholder="Créez votre identifiant" value={(Text)state.login} onChange={event=>loginChanged(event.getProposedText())} />
                                <FormControlFeedback type={loginFeedbackType()}>{state.loginFeedback}</FormControlFeedback>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Votre adresse e-mail</FormLabel>
                                <FormControl ref="email" type="email" required placeholder="Saisissez votre adresse e-mail" value={(Text)state.email} onChange={event=>emailChanged(event.getProposedText())} />
                                <FormControlFeedback type={emailFeedbackType()}>{state.emailFeedback}</FormControlFeedback>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Votre téléphone</FormLabel>
                                <FormControl ref="phone" type="tel" required pattern="([0-9]{2}[ ]){4}[0-9]{2}" placeholder="Saisissez votre téléphone" value={(Text)state.phone} onChange={event=>phoneChanged(event.getProposedText())} />
                                <FormControlFeedback type={phoneFeedbackType()}>{state.phoneFeedback}</FormControlFeedback>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Votre mot de passe</FormLabel>
                                <FormControl type="password" required pattern={PasswordChecker.getPattern(8)} placeholder="Saisissez votre mot de passe" value={(Text)state.password1} onChange={event=>password1Changed(event.getProposedText())} />
                                <FormControl type="password" required pattern={PasswordChecker.getPattern(((Text)state.password1).count)} placeholder="Répétez votre mot de passe" value={(Text)state.password2} onChange={event=>password2Changed(event.getProposedText())} />
                                <FormControlFeedback type={passwordFeedbackType()}>{state.passwordFeedback}</FormControlFeedback>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col xs={3} />
                </Row>
            </Container>
            <Button disabled={!canStoreCredentials()} onClick={event=>storeCredentials()}>Je confirme ces informations et je crée mon compte Rentavie</Button><br/><br/>
            <Button onClick={()=>props.onNext("MERGE_REGISTRATION")}>J'ai déjà un compte Rentavie, je souhaite y ajouter les points acquis avec ce bulletin</Button>
            <Disclaimer />
        </>;
    }

    method canStoreCredentials() {
        return isLoginValid() && isEmailValid() && isPhoneValid() && isPasswordValid();
    }

    method storeCredentials() {
        fetch one (mutable RegistrationDetails) where (subscriptionId == props.details.subscriptionId) then with details {
            details.login = (Text)state.login;
            details.email = (Text)state.email;
            details.phoneNumber = (Text)state.phone;
            store(details) then {
                storePassword(login = details.login, password = (Text)state.password1) then with result {
                    if("OK" == result) {
                        details.registrationStatus = LINKED;
                        store(details) then {
                            props.onNext("SUCCESS");
                        }
                    } else
                        alert("Une erreur s'est produite, veuillez contacter le support.");
                }
            }
        }
    }

    method loginChanged(login) {
        setState({login: login}, callback = checkValidLogin);
    }

    method checkValidLogin() {
        result = "LOGIN_TOO_SHORT";
        login = (Text)state.login;
        if(!isWellformedLogin(login))
            handleLoginValidation("LOGIN_MALFORMED");
        else
            fetch one (RegistrationDetails) where (login == state.login) then with details {
            if(details is null || details.subscriptionId == props.details.subscriptionId) {
                result = "OK";
            } else {
                result = "LOGIN_ALREADY_EXISTS";
            }
            handleLoginValidation(result);
        }
    }

    method isWellformedLogin(login) {
        return true;
    }

    method handleLoginValidation(Text value) {
        setState({loginFeedback: convertLoginResult(value)}, callback = () => setLoginValid(value));
    }

    method loginFeedbackType() {
        return isLoginValid() ? "valid" : "invalid";
    }

    method isLoginValid() {
        return convertLoginResult("OK") == state.loginFeedback;
    }

    method setLoginValid(Text value) {
        browserSetCustomValidity((Any)refs.login, message = value=="OK" ? "" : value);
    }

    method convertLoginResult(Text result) {
        switch(result) {
            case "LOGIN_IS_MANDATORY":
                return "Vous devez choisir un identifiant";
            case "LOGIN_TOO_SHORT":
                return "Votre identifiant doit faire au moins 8 caractères";
            case "LOGIN_ALREADY_EXISTS":
                return "Cet identifiant n'est pas disponible";
            default:
                return "Identifiant valide";
        }
    }

    method emailChanged(email) {
        setState({email: email}, callback = checkValidEmail);
    }

    method checkValidEmail() {
        result = "EMAIL_IS_MANDATORY";
        email = (Text)state.email;
        if(!isWellformedEmail(email))
            handleEmailValidation("EMAIL_MALFORMED");
        else
            fetch one (RegistrationDetails) where (email == state.email) then with details {
            if(details is null || details.subscriptionId == props.details.subscriptionId) {
                result = "OK";
            } else {
                result = "EMAIL_ALREADY_EXISTS";
            }
            handleEmailValidation(result);
        }
    }

    method handleEmailValidation(Text value) {
        setState({emailFeedback: convertEmailResult(value)}, callback = () => setEmailValid(value));
    }

    method isEmailValid() {
        return convertEmailResult("OK") == state.emailFeedback;
    }

    method setEmailValid(Text value) {
        browserSetCustomValidity((Any)refs.email, message = value=="OK" ? "" : value);
    }

    method emailFeedbackType() {
        return isEmailValid() ? "valid" : "invalid";
    }

    method convertEmailResult(Text result) {
        switch(result) {
            case "EMAIL_IS_MANDATORY":
                return "Votre adresse email est obligatoire";
            case "EMAIL_MALFORMED":
                return "Ce n'est pas une adressse email valide";
            case "EMAIL_ALREADY_EXISTS":
                return "Un compte existe déjà avec cette adressse email";
            default:
                return "Email valide";
        }
    }

    method phoneChanged(phoneNumber) {
        phoneNumber = formatPhoneNumber(phoneNumber);
        setState({phone: phoneNumber}, callback = checkValidPhone);
    }

    method checkValidPhone() {
        result = "PHONE_IS_MANDATORY";
        phoneNumber = (Text)state.phone;
        if(!isWellformedPhone(phoneNumber))
            handlePhoneValidation("PHONE_MALFORMED");
        else
            fetch one (RegistrationDetails) where (phoneNumber == phoneNumber) then with details {
            if(details is null || details.subscriptionId == props.details.subscriptionId) {
                result = "OK";
            } else {
                result = "PHONE_ALREADY_EXISTS";
            }
            handlePhoneValidation(result);
        }
    }

    method handlePhoneValidation(Text value) {
        setState({phoneFeedback: convertPhoneResult(value)}, callback = () => setPhoneValid(value));
    }

    method isPhoneValid() {
        return convertPhoneResult("OK") == state.phoneFeedback;
    }

    method setPhoneValid(Text value) {
        browserSetCustomValidity((Any)refs.phone, message = value=="OK" ? "" : value);
    }

    method phoneFeedbackType() {
        return isPhoneValid() ? "valid" : "invalid";
    }

    method convertPhoneResult(Text result) {
        switch(result) {
            case "PHONE_IS_MANDATORY":
                return "Votre numéro de téléphone est obligatoire";
            case "PHONE_MALFORMED":
                return "Ce n'est pas un numéro de téléphone valide";
            case "PHONE_ALREADY_EXISTS":
                return "Un compte existe déjà avec ce numéro de ";
            default:
                return "Téléphone valide";
        }
    }

    method password1Changed(Text value) {
        setState({password1: value}, callback = checkPassword);
    }

    method password2Changed(Text value) {
        setState({password2: value}, callback = checkPassword);
    }

    method checkPassword() {
        password1 = (Text)state.password1;
        result = PasswordChecker.check(password1);
        if(result == "OK" && password1 != state.password2)
            result = "PASSWORD_IS_DIFFERENT";
        setState({passwordFeedback: convertPasswordResult(result)});
    }

    method passwordFeedbackType() {
        valid = isPasswordValid();
        return valid ? "valid" : "invalid";
    }

    method isPasswordValid() {
        return convertPasswordResult("OK") == state.passwordFeedback;
    }

    method convertPasswordResult(Text result) {
        switch(result) {
            case "PASSWORD_IS_MANDATORY":
                return "Vous devez choisir un mot de passe";
            case "PASSWORD_TOO_SHORT":
                return "Votre mot de passe doit faire au moins 8 caractères";
            case in <"PASSWORD_MISSING_DIGIT", "PASSWORD_MISSING_LOWER", "PASSWORD_MISSING_UPPER", "PASSWORD_MISSING_SPECIAL">:
                return "Votre mot de passe doit comprendre au moins un chiffre, une minuscule, une majuscule et un caractère spécial parmi: @ & - ? ! $ # ~ _ = + *";
            case "PASSWORD_IS_DIFFERENT":
                return "Les 2 mots de passe sont différents";
            default:
                return "Mot de passe sécurisé";
        }
    }

}`;
for(let i=0; i<10; i++) {
    const before_parse_ms = Date.now();
    let parser = new OTestParser(code);
    parser.parse_declaration();
    const after_parse_ms = Date.now();
    console.log("Run " + i + ": " + (after_parse_ms - before_parse_ms));
}
