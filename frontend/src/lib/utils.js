export const BSCSCAN = 'https://testnet.bscscan.com';

export function shortAddr(addr) {
  if (!addr) return '';
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

export function formatDate(ts) {
  if (!ts) return '-';
  const n = Number(ts);
  const d = new Date(n > 1e12 ? n : n * 1000);
  if (isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export async function addBscTestnet() {
  if (!window.ethereum) throw new Error('MetaMask tidak ditemukan');
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x61' }],
    });
  } catch (err) {
    if (err.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x61',
          chainName: 'BNB Smart Chain Testnet',
          nativeCurrency: { name: 'BNB', symbol: 'tBNB', decimals: 18 },
          rpcUrls: ['https://bsc-testnet-rpc.publicnode.com'],
          blockExplorerUrls: ['https://testnet.bscscan.com'],
        }],
      });
    } else {
      throw err;
    }
  }
}
