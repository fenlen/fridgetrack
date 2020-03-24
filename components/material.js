import materialSmallRobotoBlue from '../native-base-theme/variables/materialSmallRobotoBlue';
import materialSmallRobotoRed from '../native-base-theme/variables/materialSmallRobotoRed';
import materialSmallRobotoBlack from '../native-base-theme/variables/materialSmallRobotoBlack';
import materialSmallGeorgiaBlue from '../native-base-theme/variables/materialSmallGeorgiaBlue';
import materialSmallGeorgiaRed from '../native-base-theme/variables/materialSmallGeorgiaRed';
import materialSmallGeorgiaBlack from '../native-base-theme/variables/materialSmallGeorgiaBlack';
import materialSmallCourierBlue from '../native-base-theme/variables/materialSmallCourierBlue';
import materialSmallCourierRed from '../native-base-theme/variables/materialSmallCourierRed';
import materialSmallCourierBlack from '../native-base-theme/variables/materialSmallCourierBlack';
import materialMediumRobotoBlue from '../native-base-theme/variables/materialMediumRobotoBlue';
import materialMediumRobotoRed from '../native-base-theme/variables/materialMediumRobotoRed';
import materialMediumRobotoBlack from '../native-base-theme/variables/materialMediumRobotoBlack';
import materialMediumGeorgiaBlue from '../native-base-theme/variables/materialMediumGeorgiaBlue';
import materialMediumGeorgiaRed from '../native-base-theme/variables/materialMediumGeorgiaRed';
import materialMediumGeorgiaBlack from '../native-base-theme/variables/materialMediumGeorgiaBlack';
import materialMediumCourierBlue from '../native-base-theme/variables/materialMediumCourierBlue';
import materialMediumCourierRed from '../native-base-theme/variables/materialMediumCourierRed';
import materialMediumCourierBlack from '../native-base-theme/variables/materialMediumCourierBlack';
import materialLargeRobotoBlue from '../native-base-theme/variables/materialLargeRobotoBlue';
import materialLargeRobotoRed from '../native-base-theme/variables/materialLargeRobotoRed';
import materialLargeRobotoBlack from '../native-base-theme/variables/materialLargeRobotoBlack';
import materialLargeGeorgiaBlue from '../native-base-theme/variables/materialLargeGeorgiaBlue';
import materialLargeGeorgiaRed from '../native-base-theme/variables/materialLargeGeorgiaRed';
import materialLargeGeorgiaBlack from '../native-base-theme/variables/materialLargeGeorgiaBlack';
import materialLargeCourierBlue from '../native-base-theme/variables/materialLargeCourierBlue';
import materialLargeCourierRed from '../native-base-theme/variables/materialLargeCourierRed';
import materialLargeCourierBlack from '../native-base-theme/variables/materialLargeCourierBlack';
import Global from "../state/global.js";

export const material = () => {

      switch (Global.size+Global.font+Global.colour) {
      case 'SmallRobotoBlue':
        return(materialSmallRobotoBlue);
      case 'SmallRobotoRed':
        return(materialSmallRobotoRed);
      case 'SmallRobotoBlack':
        return(materialSmallRobotoBlack);
      case 'SmallGeorgiaBlue':
        return(materialSmallGeorgiaBlue);
      case 'SmallGeorgiaRed':
        return(materialSmallGeorgiaRed);
      case 'SmallGeorgiaBlack':
        return(materialSmallGeorgiaBlack);
      case 'SmallCourierBlue':
        return(materialSmallCourierBlue);
      case 'SmallCourierRed':
        return(materialSmallCourierRed);
      case 'SmallCourierBlack':
        return(materialSmallCourierBlack);
      case 'MediumRobotoBlue':
        return(materialMediumRobotoBlue);
      case 'MediumRobotoRed':
        return(materialMediumRobotoRed);
      case 'MediumRobotoBlack':
        return(materialMediumRobotoBlack);
      case 'MediumGeorgiaBlue':
        return(materialMediumGeorgiaBlue);
      case 'MediumGeorgiaRed':
        return(materialMediumGeorgiaRed);
      case 'MediumGeorgiaBlack':
        return(materialMediumGeorgiaBlack);
      case 'MediumCourierBlue':
        return(materialMediumCourierBlue);
      case 'MediumCourierRed':
        return(materialMediumCourierRed);
      case 'MediumCourierBlack':
        return(materialMediumCourierBlack);
      case 'LargeRobotoBlue':
        return(materialLargeRobotoBlue);
      case 'LargeRobotoRed':
        return(materialLargeRobotoRed);
      case 'LargeRobotoBlack':
        return(materialLargeRobotoBlack);
      case 'LargeGeorgiaBlue':
        return(materialLargeGeorgiaBlue);
      case 'LargeGeorgiaRed':
        return(materialLargeGeorgiaRed);
      case 'LargeGeorgiaBlack':
        return(materialLargeGeorgiaBlack);
      case 'LargeCourierRed':
        return(materialLargeCourierBlue);
      case 'LargeCourierBlue':
        return(materialLargeCourierRed);
      case 'LargeCourierBlack':
        return(materialLargeCourierBlack);
      }
}