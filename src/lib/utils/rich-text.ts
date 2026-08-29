// Convert Strapi Rich Text to plain text
interface RichTextBlock {
	type?: string;
	children?: RichTextChild[];
}

interface RichTextChild {
	text?: string;
	type?: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	code?: boolean;
}

export const richTextToPlainText = (content: unknown): string => {
	if (typeof content === 'string') return content;
	if (!content) return '';
	if (!Array.isArray(content)) {
		const block = content as RichTextBlock;
		return block.children ? richTextToPlainText([block]) : '';
	}

	return content
		.map((block: unknown) => {
			const typedBlock = block as RichTextBlock;
			if (typedBlock.children && Array.isArray(typedBlock.children)) {
				return typedBlock.children
					.map((child: unknown) => {
						const typedChild = child as RichTextChild;
						return typedChild.text || '';
					})
					.join('');
			}
			return '';
		})
		.join(' ');
};
