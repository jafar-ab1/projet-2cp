import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// sign-in and sign-up pages
import SignInPage from './pages/SignIn/SignIn-page.jsx';
import SignUpPage from './pages/SignUp/SignUp-page.jsx';

// Dashboard pages
import FrontDesk from './pages/Dashboard/FrontDesk/FrontDesk.jsx';
import Guests from './pages/Dashboard/Guests/Guests.jsx';
import Deals from './pages/Dashboard/Deals/Deals.jsx';
import Rooms from './pages/Dashboard/Rooms/Rooms.jsx';
import Rates from './pages/Dashboard/Rates/Rates.jsx';
import Dashboard from './pages/Dashboard/HomePage/Dashboard.jsx';

// demo pages
import Accomodation from './pages/Accomodation/Accomodation.jsx';
import Home from './pages/Home/Home.jsx';
import Branches from './pages/Branches/Branches.jsx';
import Dinning from './pages/Dinning/Dinning.jsx';
import Occasions from './pages/Occasions/Occasions.jsx';
import Events from './pages/Events/Events.jsx';
import Wellness from './pages/Wellness/Wellness.jsx';

// layouts
import SignPageLayout from './layouts/SignPageLayout/Sign-page.layout.jsx';

// needs refactoring
import Booking from './component/Main/Booking/Booking.jsx';
import Page12 from './Page12.jsx';
import Page13 from './Page13.jsx';
import RoomsPage from './pages/Rooms/Rooms.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/dinning" element={<Dinning />} />
        <Route path="accomodation" element={<Accomodation />} />
        <Route path="branches" element={<Branches />} />
        <Route path="occasions" element={<Occasions />} />
        <Route path="events" element={<Events />} />
        <Route path="wellness" element={<Wellness />} />
        <Route path="book" element={<Booking />} />
        <Route path="choose" element={<Page12 />} />
        <Route path="checkOut" element={<Page13 />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/front-desk" element={<FrontDesk />} />
        <Route path="/guest" element={<Guests />} />
        <Route path="/deal" element={<Deals />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rate" element={<Rates />} />
        <Route path="/test" element={<RoomsPage />} />
        <Route path="/auth" element={<SignPageLayout />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
