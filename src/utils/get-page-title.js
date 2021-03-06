import defaultSetting from '@/settings'
import { generateTitle } from '@/utils/i18n'

const title = defaultSetting.title || 'ApiAdmin-Element'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${generateTitle(pageTitle)} - ${title}`
  }
  return `${title}`
}
