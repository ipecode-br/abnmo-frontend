import sharp from 'sharp'

export async function register() {
  sharp.block({
    operation: [
      'VipsForeignLoadNsgif',
      'VipsForeignLoadTiff',
      'VipsForeignLoadVips',
    ],
  })
}
