import { Box, Button, Icon, InputAdornment, Paper, TextField, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface IFerramentasDaListagem {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarBotaoNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagem> = ({
  textoDaBusca = '',
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
  aoClicarBotaoNovo,

}) => {
  const theme = useTheme();
  
  return (
    <Box 
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display={'flex'}
      gap={1}
      alignItems={'center'}
      component={Paper}
    >
      {mostrarInputBusca && (
        <TextField 
          size='small'
          placeholder='Pesquisar...'
          value={textoDaBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
      <Box flex={1} display={'flex'} justifyContent={'end'}>
        {mostrarBotaoNovo && (
          <Button
            color='primary'
            disableElevation
            variant='contained'
            endIcon={<Icon>add</Icon>}
            onClick={aoClicarBotaoNovo}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};