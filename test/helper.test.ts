import { expect, test } from '@oclif/test'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import * as helper from '../src/helper'

const response = (type: BlockObjectResponse['type']): any => {
  return {
    object: 'block',
    id: 'dummy-block-id',
    parent: {
      type: 'page_id',
      page_id: 'dummy-page-id',
    },
    has_children: true,
    archived: false,
    type: type,
  }
}

describe('getBlockPlainText', () => {
  describe('type bookmark', () => {
    const res = response('bookmark')
    res['bookmark'] = {
      url: 'https://dummy-bookmark-url.test',
    }
    test.it(() => {
      expect(helper.getBlockPlainText(res)).to.equal(res['bookmark'].url)
    })
  })
  describe('type breadcrumb', () => {
    const res = response('breadcrumb')
    res['breadcrumb'] = {}
    test.it(() => {
      expect(helper.getBlockPlainText(res)).to.equal('')
    })
  })
  describe('type child_database', () => {
    const res = response('child_database')
    res['child_database'] = {
      title: 'dummy child database title',
    }
    test.it(() => {
      expect(helper.getBlockPlainText(res)).to.equal(res['child_database'].title)
    })
  })
  describe('type child_page', () => {
    const res = response('child_page')
    res['child_page'] = {
      title: 'dummy child page title',
    }
    test.it(() => {
      expect(helper.getBlockPlainText(res)).to.equal(res['child_page'].title)
    })
  })
  describe('type column_list', () => {
    const res = response('column_list')
    res['column_list'] = {}
    test.it(() => {
      expect(helper.getBlockPlainText(res)).to.equal('')
    })
  })
  describe('type divider', () => {
    const res = response('divider')
    res['divider'] = {}
    test.it(() => {
      expect(helper.getBlockPlainText(res)).to.equal('')
    })
  })
  describe('type embed', () => {
    const res = response('embed')
    res['embed'] = {
      url: 'https://dummy-embed-url.test',
    }
    test.it(() => {
      expect(helper.getBlockPlainText(res)).to.equal(res['embed'].url)
    })
  })
  describe('type equation', () => {
    const res = response('equation')
    res['equation'] = {
      expression: 'dummy equation',
    }
    test.it(() => {
      expect(helper.getBlockPlainText(res)).to.equal(res['equation'].expression)
    })
  })
  describe('type file', () => {
    describe('file', () => {
      const res = response('file')
      res['file'] = {
        type: 'file',
        file: {
          url: 'https://dummy-file-url.test',
        },
      }
      test.it(() => {
        expect(helper.getBlockPlainText(res)).to.equal(res['file'].file.url)
      })
    })
    describe('external', () => {
      const res = response('file')
      res['file'] = {
        type: 'external',
        external: {
          url: 'https://dummy-file-url.test',
        },
      }
      test.it(() => {
        expect(helper.getBlockPlainText(res)).to.equal(res['file'].external.url)
      })
    })
  })
  describe('type link_preview', () => {
    const res = response('link_preview')
    res['link_preview'] = {
      url: 'https://dummy-link-preview-url.test',
    }
    test.it(() => {
      expect(helper.getBlockPlainText(res)).to.equal(res['link_preview'].url)
    })
  })
  describe('type synced_block', () => {
    const res = response('synced_block')
    res['synced_block'] = {}
    test.it(() => {
      expect(helper.getBlockPlainText(res)).to.equal('')
    })
  })
  describe('type table_of_contents', () => {
    const res = response('table_of_contents')
    res['table_of_contents'] = {}
    test.it(() => {
      expect(helper.getBlockPlainText(res)).to.equal('')
    })
  })
  describe('type table', () => {
    const res = response('table')
    res['table'] = {}
    test.it(() => {
      expect(helper.getBlockPlainText(res)).to.equal('')
    })
  })
  describe('type has rich_text object', () => {
    const richTextIncludesObjects = [
      'bulleted_list_item',
      'callout',
      'code',
      'heading_1',
      'heading_2',
      'heading_3',
      'numbered_list_item',
      'paragraph',
      'quote',
      'to_do',
      'toggle',
    ]
    richTextIncludesObjects.forEach((type) => {
      const res = response(type as BlockObjectResponse['type'])
      res[type] = {
        rich_text: [
          {
            type: 'text',
            plain_text: `${type} dummy text`,
          },
        ],
      }
      test.it(() => {
        expect(helper.getBlockPlainText(res)).to.equal(res[type].rich_text[0].plain_text)
      })
    })
  })
})
