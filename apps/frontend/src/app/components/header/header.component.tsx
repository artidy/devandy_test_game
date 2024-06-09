import { ReactElement } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

import { useAppSelector } from '../../hooks';
import { getPlayer } from '../../store/players/selectors';

function HeaderComponent(): ReactElement {
  const player = useAppSelector(getPlayer);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {player?.name}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderComponent;
