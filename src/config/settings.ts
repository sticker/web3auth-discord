import SampleNft from './abi/SampleNft.json';
import SampleNftMinter from './abi/SampleNftMinter.json';

type ChainSettings = {
  [key: string]: string;
};

type Settings = {
  rpc: {
    [key: string]: string;
  };
  addresses: {
    [key: string]: ChainSettings;
  };
  abis: {
    [key: string]: typeof SampleNft | typeof SampleNftMinter;
  };
};

const settings: Settings = {
  rpc: {
    polygon: 'https://polygon-rpc.com',
    polygonMumbai: 'https://polygon-mumbai.blockpi.network/v1/rpc/public',
  },
  addresses: {
    polygon: {
      SampleNft: '',
      SampleNftMinter: '',
    },
    polygonMumbai: {
      SampleNft: '0x5AF46225F6990d1067832f9E1F8e7118248F6C11',
      SampleNftMinter: '0x3B1dD1941c4970fcF1C9E0A32E364e02f9816D42',
    },
  },
  abis: {
    SampleNft,
    SampleNftMinter,
  },
};

export default settings;
