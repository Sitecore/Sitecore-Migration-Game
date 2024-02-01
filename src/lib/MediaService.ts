import { IImage } from 'models';
import { GetMediaByIdQuery } from '../GraphQL/Queries/Media.gql';
import { chOneService } from './CHOneService';

export const MediaService = () => {
  const GetMediaById = async (mediaId: string): Promise<IImage | undefined> => {
    const { error, data } = await chOneService().query({
      query: GetMediaByIdQuery,
      variables: { id: mediaId },
    });

    if (error) {
      console.log(error);
      return undefined;
    }

    const results = data?.media as IImage;

    return results;
  };

  return { GetMediaById };
};
