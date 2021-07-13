const fs = require('fs-extra')
const path = require('path')

/*
 * Gatsby Cloud passes some environment variables (this one is ultimately undocumented)
 * You can use these to only perform some moves conditionally
 */
const { RUNNER_TYPE = 'BUILDS' } = process.env

/*
 * Note: this is a non-ideal workaround
 * that we are encouraging until we ship pathPrefix support in Gatsby Hosting
 * Please follow: https://gatsby.canny.io/gatsby-cloud/p/prefix-path-support
 */
exports.onPostBuild = async function onPostBuild() {
  const allowList = ['BUILDS', 'INCREMENTAL_BUILDS']

  if (allowList.includes(RUNNER_TYPE)) {
    const public = path.join(__dirname, 'public')
    const tmp = path.join(__dirname, 'public2')
    await fs.rename(public, tmp)
    await fs.copy(
      tmp,
      path.join(public, 'news'),
    )

    await fs.remove(tmp)
  }
}
