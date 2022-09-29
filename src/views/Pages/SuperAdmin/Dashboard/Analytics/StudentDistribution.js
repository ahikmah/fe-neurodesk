import PropTypes from 'prop-types';

// material-ui
import { Button, CardActions, CardMedia, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-components/cards/MainCard';

const rows = [
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Coat_of_arms_of_Aceh.svg/118px-Coat_of_arms_of_Aceh.svg.png',
    location: 'Aceh',
    total: 3,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Coat_of_arms_of_North_Sumatra.svg/96px-Coat_of_arms_of_North_Sumatra.svg.png',
    location: 'Sumatra Utara',
    total: 1,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Coat_of_arms_of_West_Sumatra.svg/105px-Coat_of_arms_of_West_Sumatra.svg.png',
    location: 'Sumatra Barat',
    total: 0,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Coat_of_arms_of_Riau.svg/81px-Coat_of_arms_of_Riau.svg.png',
    location: 'Riau',
    total: 0,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Coat_of_arms_of_Riau_Islands.svg/90px-Coat_of_arms_of_Riau_Islands.svg.png',
    location: 'Kepulauan Riau',
    total: 0,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Coat_of_arms_of_Jambi.svg/115px-Coat_of_arms_of_Jambi.svg.png',
    location: 'Jambi',
    total: 0,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Coat_of_arms_of_Bengkulu.svg/95px-Coat_of_arms_of_Bengkulu.svg.png',
    location: 'Bengkulu',
    total: 0,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Coat_of_arms_of_South_Sumatra.svg/93px-Coat_of_arms_of_South_Sumatra.svg.png',
    location: 'Sumatra Selatan',
    total: 0,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Coat_of_arms_of_Bangka_Belitung_Islands.svg/96px-Coat_of_arms_of_Bangka_Belitung_Islands.svg.png',
    location: 'Kepulauan Bangka Belitung',
    total: 0,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Coat_of_arms_of_Lampung.svg/81px-Coat_of_arms_of_Lampung.svg.png',
    location: 'Lampung',
    total: 7,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Coat_of_arms_of_Jakarta.svg/106px-Coat_of_arms_of_Jakarta.svg.png',
    location: 'Jakarta',
    total: 0,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Coat_of_arms_of_Banten.svg/114px-Coat_of_arms_of_Banten.svg.png',
    location: 'Banten',
    total: 0,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Coat_of_arms_of_West_Java.svg/103px-Coat_of_arms_of_West_Java.svg.png',
    location: 'Jawa Barat',
    total: 68,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Coat_of_arms_of_Central_Java.svg/112px-Coat_of_arms_of_Central_Java.svg.png',
    location: 'Jawa Tengah',
    total: 74,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Coat_of_arms_of_Yogyakarta.svg/92px-Coat_of_arms_of_Yogyakarta.svg.png',
    location: 'Yogyakarta',
    total: 55,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Coat_of_arms_of_East_Java.svg/85px-Coat_of_arms_of_East_Java.svg.png',
    location: 'Jawa Timur',
    total: 75,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Coat_of_arms_of_West_Nusa_Tenggara.svg/81px-Coat_of_arms_of_West_Nusa_Tenggara.svg.png',
    location: 'Nusa Tenggara Barat',
    total: 0,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Coat_of_Arms_of_East_Nusa_Tenggara_NEW.png/120px-Coat_of_Arms_of_East_Nusa_Tenggara_NEW.png',
    location: 'Nusa Tenggara Timur',
    total: 0,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Coat_of_arms_of_West_Kalimantan.svg/88px-Coat_of_arms_of_West_Kalimantan.svg.png',
    location: 'Kalimantan Barat',
    total: 0,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Coat_of_arms_of_Central_Kalimantan.svg/91px-Coat_of_arms_of_Central_Kalimantan.svg.png',
    location: 'Kalimantan Tengah',
    total: 0,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Coat_of_arms_of_South_Kalimantan.svg/86px-Coat_of_arms_of_South_Kalimantan.svg.png',
    location: 'Kalimantan Selatan',
    total: 0,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Coat_of_arms_of_East_Kalimantan.svg/98px-Coat_of_arms_of_East_Kalimantan.svg.png',
    location: 'Kalimantan Timur',
    total: 0,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Coat_of_arms_of_North_Kalimantan_%282021_version%29.svg/89px-Coat_of_arms_of_North_Kalimantan_%282021_version%29.svg.png',
    location: 'Kalimantan Utara',
    total: 0,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Coat_of_arms_of_North_Sulawesi.svg/120px-Coat_of_arms_of_North_Sulawesi.svg.png',
    location: 'Sulawesi Utara',
    total: 0,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Coat_of_arms_of_Gorontalo.svg/107px-Coat_of_arms_of_Gorontalo.svg.png',
    location: 'Gorontalo',
    total: 0,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Coat_of_arms_of_Central_Sulawesi.svg/76px-Coat_of_arms_of_Central_Sulawesi.svg.png',
    location: 'Sulawesi Tengah',
    total: 0,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Coat_of_arms_of_West_Sulawesi.svg/108px-Coat_of_arms_of_West_Sulawesi.svg.png',
    location: 'Sulawesi Barat',
    total: 0,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Coat_of_arms_of_South_Sulawesi.svg/98px-Coat_of_arms_of_South_Sulawesi.svg.png',
    location: 'Sulawesi Selatan',
    total: 0,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Coat_of_arms_of_Southeast_Sulawesi.svg/120px-Coat_of_arms_of_Southeast_Sulawesi.svg.png',
    location: 'Sulawesi Tenggara',
    total: 0,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Coat_of_arms_of_North_Maluku.svg/104px-Coat_of_arms_of_North_Maluku.svg.png',
    location: 'Maluku Utara',
    total: 0,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Coat_of_arms_of_Maluku.svg/109px-Coat_of_arms_of_Maluku.svg.png',
    location: 'Maluku',
    total: 0,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Coat_of_arms_of_West_Papua.svg/84px-Coat_of_arms_of_West_Papua.svg.png',
    location: 'Papua Barat',
    total: 0,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Coat_of_arms_of_Papua_2.svg/104px-Coat_of_arms_of_Papua_2.svg.png',
    location: 'Papua',
    total: 0,
  },
];

const StudentDistribution = ({ title }) => {
  return (
    <MainCard title={title} content={false} border={false}>
      <PerfectScrollbar style={{ height: 380, padding: 0 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: 3 }}>#</TableCell>
                <TableCell>Provinsi</TableCell>
                <TableCell align="center">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell sx={{ pl: 3 }}>
                    <CardMedia component="img" image={row.image} title="image" sx={{ width: 30, height: 'auto' }} />
                  </TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell align="center">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PerfectScrollbar>

      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="text" size="small">
          Lihat Selengkapnya
        </Button>
      </CardActions>
    </MainCard>
  );
};

StudentDistribution.propTypes = {
  title: PropTypes.string,
};

export default StudentDistribution;
