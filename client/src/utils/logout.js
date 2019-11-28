export default function logout(props) {
  sessionStorage.clear();
  props.push("/");
}
