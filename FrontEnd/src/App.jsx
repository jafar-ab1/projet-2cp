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
import Calendar from './components/Dashboard/FrontDesk/Calendar.jsx';

import LandingPageLayout from './layouts/LandingPageLayout/Landing-page.layout.jsx';
import SignPageLayout from './layouts/SignPageLayout/Sign-page.layout.jsx';

import Dashboard from './pages/Dashboard/HomePage/Dashboard.jsx';
import Accomodation from './pages/Accomodation/Accomodation.jsx';

import Home from './pages/Home/Home.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing layout for main pages */}
        <Route path="/" element={<LandingPageLayout />}>
          <Route index element={<Home />} />
          <Route path="accomodation" element={<Page2 />} />
          <Route path="algiers" element={<Page3 />} />
          <Route path="dining" element={<Page4 />} />
          <Route path="gourmet" element={<Page5 />} />
          <Route path="golden" element={<Page6 />} />
          <Route path="nook" element={<Page7 />} />
          <Route path="occasions" element={<Page8 />} />
          <Route path="events" element={<Page9 />} />
          <Route path="wellness" element={<Page10 />} />
          <Route path="book" element={<Booking />} />
          <Route path="choose" element={<Page12 />} />
          <Route path="checkOut" element={<Page13 />} />
        </Route>

        {/* Dashboard and FrontDesk pages (you can wrap in dashboard layout if needed) */}
        <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/front-desk" element={<FrontDesk/>} />
        <Route path="/test" element={<Accomodation />} />

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
