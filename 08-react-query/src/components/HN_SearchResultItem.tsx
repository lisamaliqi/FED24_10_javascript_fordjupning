import ListGroup from "react-bootstrap/ListGroup";
import { timestampToFormattedString } from "../utils/dateFormatter";
import type { HN_SearchHit } from "../services/HackerNews.types";

interface HN_SearchResultItemProps {
	item: HN_SearchHit;
}

const HN_SearchResultItem: React.FC<HN_SearchResultItemProps> = ({ item }) => {
	return (
		<ListGroup.Item
			action
			href={item.url}
			target="_blank"
			rel="nofollow noreferrer"
		>
			<h2 className="h4 mb-1">{item.title}</h2>
			<p className="text-muted mb-2">by {item.author}</p>
			<div className="text-muted small d-flex justify-content-between">
				<span title={item.created_at}>{timestampToFormattedString(item.created_at_i * 1000)}</span>
				<span>{item.points} points</span>
			</div>
		</ListGroup.Item>
	)
}

export default HN_SearchResultItem;
