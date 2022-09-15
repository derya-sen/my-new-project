import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PieChart from './PieChart'
import {getText} from './PieChart'
import {getText2} from './PieChart'
import ApexChart from './PieChart'

export default function ToggleButtons() {
  const [alignment, setAlignment] = React.useState('heute');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="heute" aria-label="heute" onClick={() => getText("https://www.wiediversistmeingarten.org/api/count")}> heute </ToggleButton>
      <ToggleButton value="gestern" aria-label="gestern" onClick={() => getText2("https://www.wiediversistmeingarten.org/api/count")}> gestern</ToggleButton>
    </ToggleButtonGroup>

    
  );

}
