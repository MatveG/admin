import { LoadingProgrammatic } from 'buefy'

export default function () {
  let component;

  function globalLoading () {
    component = LoadingProgrammatic.open({});
  }

  function globalReady () {
    component.close();
  }

  return {
    globalLoading,
    globalReady
  }
}
