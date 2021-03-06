import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Avatar, MenuDivider, Input } from 'react-rainbow-components';
import { AiFillHeart, AiOutlineSend } from 'react-icons/ai';
import { Comments } from './Comments';
import { useAuthContext } from '../contexts/Auth';
import { addComment } from '../db/addComment';
import { addLike } from '../db/addLike';

const MyCard = styled(Card)`
    margin: 16px 16px;
`;

const Heart = styled.div`
    color: ${props => props.theme.rainbow.palette.secondary.light};
    display: flex;
    align-items: center;
    font-size: 24px;
`;

const Divider = styled(MenuDivider)`
    &::marker {
        content: '';
    }
`;

const Content = styled.div`
    padding: 8px 16px;
    font-size: 14px;
`;

const Footer = styled.div`
    padding: 12px 20px;
    display: flex;
    justify-content: stretch;
    align-items: center;
    color: ${props => props.theme.rainbow.palette.primary.main};
`;

const MyInput = styled(Input)`
    flex-grow: 3;
    margin-right: 8px;
`;

const Post = ({ id, displayName, photoURL, text, likes, likedBy }: any) => {
    const [comment, setComment] = useState('');
    const {
        user: { uid: myuid, displayName: mydisplayName, photoURL: myphotoURL }
    } = useAuthContext();

    const handleCommentAdd = async () => {
        setComment('');
        await addComment({ uid: myuid, displayName: mydisplayName, photoURL: myphotoURL }, id, comment);
    };

    const handleLike = () => {
        if (likedBy?.some(id => id === myuid)) return;
        addLike(likes, id, myuid);
    };

    return (
        <MyCard
            title={displayName}
            icon={<Avatar src={photoURL} />}
            actions={
                <Heart onClick={handleLike}>
                    {likes}
                    <AiFillHeart size="1em" />
                </Heart>
            }
        >
            <Divider />
            <Content>{text}</Content>
            <Divider />
            <Comments postId={id} />
            <Divider />
            <Footer>
                <MyInput
                    placeholder="Dodaj komentarz"
                    value={comment}
                    onKeyDown={e => e.key === 'Enter' && handleCommentAdd()}
                    onChange={e => setComment(e.target.value)}
                />
                <AiOutlineSend size="2.5em" onClick={handleCommentAdd} />
            </Footer>
        </MyCard>
    );
};

export { Post };
