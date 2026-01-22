'use client'

import type { TextFieldClientComponent } from 'payload'
import { useField } from '@payloadcms/ui'
import './ContentHtmlField.scss'

const ContentHtmlField: TextFieldClientComponent = (props) => {
  const { value, setValue } = useField<string>({
    path: props.path,
  })

  return (
    <div className="content-html-field-wrapper">
        Content HTML
      <textarea
        className="content-html-textarea"
        value={value || ''}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
        readOnly={props.field.admin?.readOnly}
      />
    </div>
  )
}

export default ContentHtmlField
