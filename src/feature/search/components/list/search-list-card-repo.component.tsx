import { Repository } from "../../state/models/repos";

export function SearchListCardRepo(props: Repository): JSX.Element {
  return (
      <div className='card'>
       <div className='avatar'>
           <img src='github.svg' alt=""/>
       </div>
      </div>
  );
}
