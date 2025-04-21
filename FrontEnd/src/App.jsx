import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Page2 from './Page2.jsx';
import Page3 from './Page3.jsx';
import Page4 from './Page4.jsx';
import Page5 from './Page5.jsx';
import Page6 from './Page6.jsx';
import Page7 from './Page7.jsx';
import Page8 from './Page8.jsx';
import Page9 from './Page9.jsx';
import Page10 from './Page1-0.jsx';
import Booking from './component/Main/Booking/Booking.jsx';
import Page12 from './Page12.jsx';
import Page13 from './Page13.jsx';
import SignInPage from './pages/SignIn/SignIn-page.jsx';
import SignUpPage from './pages/SignUp/SignUp-page.jsx';
import FrontDesk from './pages/Dashboard/FrontDesk/FrontDesk.jsx';
import Guests from './pages/Dashboard/Guests/Guests.jsx';
import Deals from './pages/Dashboard/Deals/Deals.jsx';
import Rooms from './pages/Dashboard/Rooms/Rooms.jsx';
import Rates from './pages/Dashboard/Rates/Rates.jsx';
import SignPageLayout from './layouts/SignPageLayout/Sign-page.layout.jsx';

import Dashboard from './pages/Dashboard/HomePage/Dashboard.jsx';
import Accomodation from './pages/Accomodation/Accomodation.jsx';

import Home from './pages/Home/Home.jsx';
import Branches from './pages/Branches/Branches.jsx';
import Dinning from './pages/Dinning/Dinning.jsx';
import Occasions from './pages/Occasions/Occasions.jsx';
import Events from './pages/Events/Events.jsx';
import Wellness from './pages/Wellness/Wellness.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing layout for main pages */}
        <Route index element={<Home />} />
        <Route path="accomodation" element={<Accomodation />} />
        <Route path="branches" element={<Branches />} />
        <Route path="dinning" element={<Dinning />} />
        <Route path="occasions" element={<Occasions />} />
        <Route path="events" element={<Page9 />} />
        <Route path="wellness" element={<Page10 />} />
        <Route path="book" element={<Booking />} />
        <Route path="choose" element={<Page12 />} />
        <Route path="checkOut" element={<Page13 />} />

        {/* Dashboard and FrontDesk pages (you can wrap in dashboard layout if needed) */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/front-desk" element={<FrontDesk />} />
        <Route path="/test" element={<Wellness />} />
        <Route path="/guest" element={<Guests />} />
        <Route path="/deal" element={<Deals />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rate" element={<Rates />} />

        {/* Sign in/up pages under their own layout */}
        <Route path="/auth" element={<SignPageLayout />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
