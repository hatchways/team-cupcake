export default function logout(props) {
  sessionStorage.clear();
  props.history.push("/");
}
