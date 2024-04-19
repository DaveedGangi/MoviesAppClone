import {Link} from 'react-router-dom'

const NotFound = () => (
  <div
    style={{
      backgroundImage: `url(
        https://i.ibb.co/85s872h/snow-removal-machine-working-high-ski-slope-snowstorm-454047-2149-1.png
      )`,
      width: '100%',
      height: `100vh`,
      top: '135px',
      left: '166px',
      gap: '0px',
      borderRadius: '0px',
      opacity: '0.8',
      backgroundSize: 'cover',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <h1>Lost Your Way</h1>
    <p>
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button">Go to Home</button>
    </Link>
  </div>
)

export default NotFound
