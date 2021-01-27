import { ApiError } from "../../feature/search/state/search.types";

export function ErrorPage(error: ApiError) {
  return error.message ? (
    <div className='error-page'>
      <div className='browser'>
        <div className='controls'>
          <i></i>
          <i></i>
          <i></i>
        </div>
        <div className='eye'></div>
        <div className='eye'></div>
        <div className='mouth'>
          <div className='lips'></div>
          <div className='lips'></div>
          <div className='lips'></div>
          <div className='lips'></div>
          <div className='lips'></div>
          <div className='lips'></div>
          <div className='lips'></div>
          <div className='lips'></div>
        </div>
      </div>
      <h1>Oops, something has gone wrong.</h1>
      <p>
        We're unable to fulfill your request. Rest assured we have been notified
        and are looking into the issue. Please refresh your browser.
      </p>
    </div>
  ) : null;
}


// design of this component was found at https://codepen.io/roguetue/pen/JLMXJp