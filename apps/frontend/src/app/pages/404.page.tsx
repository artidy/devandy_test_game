import { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';

function Page404(): ReactElement {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <Box textAlign="center">
        <Typography variant="h4">Страница не найдена!</Typography>
      </Box>
    </Box>
  )
}

export default Page404;
