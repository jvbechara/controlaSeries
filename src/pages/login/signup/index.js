import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Container } from "./styles";
import api from "../../../services/Api";
import Logo from "../../../images/bea5a206de3337ed485a477246bc6b66.png";
import '../style.css';

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    if (!username || !email || !password) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        await api.post("/user", { name: username, email, password });
        this.props.history.push("/");
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
      }
    }
  };

  render() {
    return (
      <div className='login-logout'>
        <Container>
          <Form onSubmit={this.handleSignUp}>
              {this.state.error && <p>{this.state.error}</p>}
              <img src={Logo} alt="logo Genericflix" />
              <input
                  type="text"
                  placeholder="Nome de usuário"
                  onChange={e => this.setState({ username: e.target.value })}
              />
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
              <button type="submit">Cadastrar</button>
              <hr />
              <Link to="/signin">Fazer login</Link>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(SignUp);
