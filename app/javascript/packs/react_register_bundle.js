import ReactOnRails from 'react-on-rails';

import HelloWorld from '../bundles/HelloWorld/components/HelloWorld';
import UploadXml from '../bundles/Xml/components/UploadXml';
import BaseBallStats from '../bundles/Xml/components/BaseBallStats';


// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld, UploadXml, BaseBallStats
});


