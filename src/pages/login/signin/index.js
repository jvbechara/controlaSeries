import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../../services/Api";
import { login, isAuthenticated } from "../../../services/auth";
import { Form, Container } from "./styles";
import Logo from "../../../images/bea5a206de3337ed485a477246bc6b66.png";
import '../style.css';


class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/user/authenticate", {email, password});
        // auth.setName(response.data.data.name);
        login(response.data.token);
        this.props.history.push("/");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };

  render() {
    return (
      <div className='login-logout'>
      <Container>
        <Form onSubmit={this.handleSignIn}>
          {this.state.error && <p>{this.state.error}</p>}
          <img src={Logo} alt="logo Genericflix" />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/signup">Criar conta</Link>
        </Form>
      </Container>
      </div>
    );
  }
}

export default withRouter(SignIn);